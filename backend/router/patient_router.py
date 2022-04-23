from __main__ import app
from flask import request, jsonify

from controller.patient_controller import PatientController

@app.route("/patient", methods=["GET"])
def get_all_patients():
    patientes = PatientController.get_patient_list()
    return jsonify(patientes)

@app.route("/patient", methods=["POST"])
def register_patient():
    body_data = request.get_json()
    patient = PatientController.register_patient(patient_data=body_data)
    return jsonify(patient)

@app.route("/patient/<id>", methods=["GET"])
def get_patient(id: int):
    patient = PatientController.get_patient(id=id)
    return jsonify(patient)

@app.route("/patient/<id>", methods=["DELETE"])
def delete_patient(id: int):
    patient = PatientController.delete_patient(id=id)
    return jsonify(patient)

@app.route("/patient/<id>", methods=["PUT"])
def update_patient(id: int):
    body_data = request.get_json()
    patient = PatientController.update_patient(id=id, data=body_data)
    return jsonify(patient)