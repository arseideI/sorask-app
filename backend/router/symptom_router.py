from __main__ import app
from flask import request, jsonify

from controller.symptom_controller import SymptomController

@app.route("/symptom", methods=["GET"])
def get_all_symptoms():
    symptomes = SymptomController.get_symptom_list()
    return jsonify(symptomes)

@app.route("/symptom", methods=["POST"])
def register_symptom():
    body_data = request.get_json()
    symptom = SymptomController.register_symptom(symptom_data=body_data)
    return jsonify(symptom)

@app.route("/symptom/<id>", methods=["GET"])
def get_symptom(id: int):
    symptom = SymptomController.get_symptom(id=id)
    return jsonify(symptom)

@app.route("/symptom/<id>", methods=["DELETE"])
def delete_symptom(id: int):
    symptom = SymptomController.delete_symptom(id=id)
    return jsonify(symptom)

@app.route("/symptom/<id>", methods=["PUT"])
def update_symptom(id: int):
    body_data = request.get_json()
    symptom = SymptomController.update_symptom(id=id, data=body_data)
    return jsonify(symptom)