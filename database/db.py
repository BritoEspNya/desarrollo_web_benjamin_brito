import pymysql
import json
from datetime import time

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb" 
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

# -- conn ---

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

# -- querys --

def get_actividades():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_actividades"], (5, ))
	actividades = cursor.fetchall()
	return actividades

def get_actividades_paginadas(page):
	conn = get_conn()
	cursor = conn.cursor()
	offset = (page - 1) * 5
	cursor.execute(QUERY_DICT["get_actividades_paginadas"], (5, offset))
	actividades = cursor.fetchall()
	cursor.execute(QUERY_DICT["get_conteo_actividades"])
	total_actividades = cursor.fetchone()[0]
	total_paginas = (total_actividades + 5 - 1)
	return actividades, total_paginas

def get_regiones():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_regiones"])
	regiones = cursor.fetchall()
	return regiones

def get_comunas_by_region(region_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comunas_by_region"], (region_id,))
	comunas = cursor.fetchall()
	return comunas

def get_comuna_by_id(comuna_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comuna_by_id"], (comuna_id,))
	comuna = cursor.fetchone()
	return comuna

def get_comentarios_by_actId(actividad_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comentarios_by_actId"], (actividad_id,))
	comentarios = cursor.fetchall()
	return comentarios

def crear_actividad(comuna_id, sector, organizador, email, celular, dia_hora_inicio, dia_hora_termino, descripcion, temas, redes, imgs_dict):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["crear_actividad"], (comuna_id, sector, organizador, email, celular, dia_hora_inicio, dia_hora_termino, descripcion))
	actividad_id = cursor.lastrowid
	for tema in temas:
		if not tema in ['música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida']:
			cursor.execute(QUERY_DICT["crear_tema"], ('otro', tema, actividad_id))
		else:
			cursor.execute(QUERY_DICT["crear_tema"], (tema, '', actividad_id))
	for nombre_red in redes:
		cursor.execute(QUERY_DICT["crear_contacto"], (nombre_red, redes[nombre_red], actividad_id))
	for filepath in imgs_dict:
		cursor.execute(QUERY_DICT["crear_foto"], (filepath, imgs_dict[filepath], actividad_id))
	conn.commit()

def crear_comentario(nombre, comentario, fecha, actividad_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["crear_comentario"], (nombre, comentario, fecha, actividad_id))
	conn.commit()

def get_conteo_actividades_by_horario():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_all_actividades"])
	actividades = cursor.fetchall()
	conteo_actividades_by_horario = {mes: [0, 0, 0] for mes in range(1, 13)}
	for actividad in actividades:
		_, _, _, _, _, _, dia_hora_inicio, _, _ = actividad
		if dia_hora_inicio.time() < time(12, 0, 0):
			conteo_actividades_by_horario[dia_hora_inicio.month][0] += 1
		elif dia_hora_inicio.time() < time(16, 0, 0):
			conteo_actividades_by_horario[dia_hora_inicio.month][1] += 1
		else:
			conteo_actividades_by_horario[dia_hora_inicio.month][2] += 1
	return conteo_actividades_by_horario

def get_conteo_actividades_by_tipo():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_temas"])
	temas = cursor.fetchall()
	conteo_actividades_by_tipo = {'música': 0, 'deporte': 0, 'ciencias': 0, 'religión': 0, 'política': 0, 'tecnología': 0, 'juegos': 0, 'baile': 0, 'comida': 0, 'otro': 0}
	for tema in temas:
		_, t, _, _ = tema
		conteo_actividades_by_tipo[t] += 1
	return conteo_actividades_by_tipo

def get_conteo_actividades_por_dia():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_all_actividades"])
	actividades = cursor.fetchall()
	conteo_actividades_por_dia = {}
	for actividad in actividades:
		_, _, _, _, _, _, dia_hora_inicio, _, _ = actividad
		conteo_actividades_por_dia[dia_hora_inicio.weekday()] = conteo_actividades_por_dia.get(dia_hora_inicio.weekday(), 0) + 1
	return conteo_actividades_por_dia
		
	
