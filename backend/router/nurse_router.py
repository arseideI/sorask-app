from __main__ import app
from lib2to3.pytree import convert
from flask import request, jsonify

from controller.nurse_controller import NurseController

@app.route("/nurse", methods=["GET"])
def get_all_nurses():
    nursees = NurseController.get_nurse_list()
    return jsonify(nursees)

@app.route("/nurse", methods=["POST"])
def register_nurse():
    body_data = request.get_json()
    nurse = NurseController.register_nurse(nurse_data=body_data)
    return jsonify(nurse)

@app.route("/nurse/<id>", methods=["GET"])
def get_nurse(id: int):
    id_converted = int(id)
    nurse = NurseController.get_nurse(id=id_converted)
    return jsonify(nurse)

@app.route("/nurse/<id>", methods=["DELETE"])
def delete_nurse(id: int):
    nurse = NurseController.delete_nurse(id=id)
    return jsonify(nurse)

@app.route("/nurse/<id>", methods=["PUT"])
def update_nurse(id: int):
    body_data = request.get_json()
    
    nurse = NurseController.update_nurse(id=id, data=body_data)
    return jsonify(nurse)