from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from utils.validations import  validate_activity
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import json
import sys

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)


app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ++++ RUTAS +++++
@app.route("/", methods=["GET"])
def index():
    data = []
    for act in db.get_actividades():
        _, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion = act

        data.append({
            "comuna": db.get_comuna_by_id(comuna_id),
            "sector": sector,
            "nombre": nombre,
            "email": email,
            "celular": celular,
            "dia_hora_inicio": dia_hora_inicio,
            "dia_hora_termino": dia_hora_termino,
            "descripcion": descripcion
        })

    return render_template("actividades/portada.html", data=data)

@app.route("/actividades", methods=["GET"])
def actividades():
    pagina = request.args.get('pagina', 1, type=int)
    actividades, total_paginas = db.get_actividades_paginadas(pagina)
    data = []
    for act in actividades:
        _, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion = act

        data.append({
            "comuna": db.get_comuna_by_id(comuna_id),
            "sector": sector,
            "nombre": nombre,
            "email": email,
            "celular": celular,
            "dia_hora_inicio": dia_hora_inicio,
            "dia_hora_termino": dia_hora_termino,
            "descripcion": descripcion
        })

    return render_template("actividades/actividades.html", data=data, current_pagina=pagina, total_paginas=total_paginas)

@app.route("/agregar-actividad", methods=["GET", "POST"])
def formulario():
    regiones = db.get_regiones()
    return render_template("actividades/formulario.html", regiones=regiones)

@app.route("/get_comunas/<int:region_id>", methods=["GET"])
def get_comunas_api(region_id):
    comunas = db.get_comunas_by_region(region_id)
    comunas_list = [{"id": c_id, "nombre": c_nombre} for c_id, c_nombre in comunas]
    return jsonify(comunas_list)

@app.route("/estadisticas", methods=["GET"])
def estadisticas():
    return render_template("actividades/estadisticas.html")

@app.route("/post-act", methods=["POST"])
def post_act():
    act_region = request.form.get("act-region")
    act_comuna = request.form.get("act-comuna")
    act_sector = request.form.get("act-sector")

    act_organizador = request.form.get("act-organizador")
    act_email = request.form.get("act-email")
    act_tel = request.form.get("act-tel")
    act_redes_json = request.form.get("act-redes-json") 

    act_dhi = request.form.get("act-dia_hora_inicio")
    act_dht = request.form.get("act-dia_hora_termino")
    act_desc = request.form.get("act-desc")
    act_temas_json = request.form.get("act-temas-json") 

    act_imgs = request.files.getlist("act-fotos")

    if validate_activity(act_region, act_comuna, act_sector, act_organizador, act_email, act_tel, json.loads(act_redes_json), act_dhi, act_dht, json.loads(act_temas_json), act_imgs):
        # 1. generate random name for imgs
        imgs_dict = {}
        for act_img in act_imgs:
            _filename = hashlib.sha256(
                secure_filename(act_img.filename) # nombre del archivo
                .encode("utf-8") # encodear a bytes
                ).hexdigest()
            _extension = filetype.guess(act_img).extension
            img_filename = f"{_filename}.{_extension}"

            # 2. save img as a file
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], img_filename)
            act_img.save(filepath)

            imgs_dict[filepath] = img_filename

        # 3. save confession in db
        db.crear_actividad(act_comuna, act_sector, act_organizador, act_email, act_tel, act_dhi, act_dht, act_desc, json.loads(act_temas_json), json.loads(act_redes_json), imgs_dict)
    
        return redirect(url_for("index"))
    else:
        return redirect(url_for("formulario"))


if __name__ == "__main__":
    app.run(debug=True)