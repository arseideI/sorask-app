from crypt import methods
from flask import request, jsonify, Blueprint

patient_bp = Blueprint('patient', __name__,)


@patient_bp.route("/patient", methods=["GET"])
def get_all_patients():
    pass

@patient_bp.route("/patient", methods=["POST"])
def register_patient():
    pass

@patient_bp.route("/patient/<id>", methods=["GET"])
def get_patient(id: int):
    return {"id": int(id)}

@patient_bp.route("/patient/<id>", methods=["PUT"])
def update_patient(id: int):
    return {"id": int(id), "status": "Atualizado"}