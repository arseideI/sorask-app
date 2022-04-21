from __main__ import app
from flask import request, jsonify

from controller.patient_controller import PatientController

@app.route("/patient", methods=["GET"])
def get_all_patients():
    patientes = PatientController.get_patient_list()
    return jsonify(patientes)

@app.route("/patient", methods=["POST"])
def register_patient():
    return jsonify({})

@app.route("/patient/<id>", methods=["GET"])
def get_patient(id: int):
    return jsonify({"id": int(id)})

@app.route("/patient/<id>", methods=["PUT"])
def update_patient(id: int):
    return jsonify({"id": int(id), "status": "Atualizado"})