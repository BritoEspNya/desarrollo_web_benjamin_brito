import re
import filetype
import json
from datetime import datetime


def validate_email(email):
    return "@" in email

def validate_img(img):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    # check if a file was submitted
    if img is None:
        return False

    # check if the browser submitted an empty file
    if img.filename == "":
        return False
    
    # check file extension
    ftype_guess = filetype.guess(img)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        print("Erro al validar imagenes")
        return False
    return True

def validate_not_empty(value):
    return value != ""

def validate_tel(tel):
    return "+" in tel or len(tel) != 12

def validate_max_length(value, n):
    return len(value) < n

def validate_activity(act_region, act_comuna,act_sector, act_organizador, act_email, act_tel, act_redes, act_dhi, act_dht, act_temas, act_imgs_dict):
    isValid = True

    #act_redes = json.loads(act_redes_json)
    #act_temas = json.loads(act_temas_json)

    for value in [act_region, act_comuna, act_organizador, act_email]:
        if not validate_not_empty(value):
            print("Error campo vacio")
            isValid = False
    if len(act_temas) == 0 or len(act_imgs_dict) == 0:
        print("Error campo vacio")
        isValid = False
    if not act_dhi:
        print("Error campo vacio")
        isValid = False
    
    for (value, n) in [(act_sector, 100), (act_organizador, 200), (act_email, 100)]:
        if not validate_max_length(value, n):
            print("Error campo excede max_length")
            isValid = False
    for nombre_red in act_redes:
        if not validate_max_length(act_redes[nombre_red], 50):
            print("Error campo excede max_length")
            isValid = False
    for tema in act_temas:
        if not validate_max_length(tema, 15):
            print("Error campo excede max_length")
            isValid = False
    if len(act_imgs_dict) > 5:
        print("Error campo excede max_length")
        isValid = False
    
    if act_dht != '':
        fecha_dhi = datetime.strptime(act_dhi, '%Y-%m-%dT%H:%M')
        fecha_dht = datetime.strptime(act_dht, '%Y-%m-%dT%H:%M')
        if fecha_dhi > fecha_dht:
            print("Error fecha de termina menor que inicio")
            isValid = False

    return isValid and validate_email(act_email) and validate_tel(act_tel)