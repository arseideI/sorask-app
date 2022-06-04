from __main__ import app
from flask import request, jsonify

from controller.classification_controller import ClassificationController

@app.route("/classification", methods=["GET"])
def get_all_classifications():
    date_filter = request.headers.get("out_date")
    print("Dateeee:", date_filter)
    classificationes = ClassificationController().get_classification_list(date_filter=date_filter)
    return jsonify(classificationes)

@app.route("/classification/form", methods=["GET"])
def get_all_classifications_form_data():
    classificationes = ClassificationController().get_data_to_classification_form()
    return jsonify(classificationes)

@app.route("/classification", methods=["POST"])
def register_classification():
    body_data = request.get_json()
    print("testeeee============ ", body_data)
    classification = ClassificationController().register_classification(classification_data=body_data)
    return jsonify(classification)

@app.route("/classification/<id>", methods=["GET"])
def get_classification(id: int):
    
    classification = ClassificationController().get_classification(id=id)
    return jsonify(classification)

@app.route("/classification/<id>", methods=["DELETE"])
def delete_classification(id: int):
    classification = ClassificationController().delete_classification(id=id)
    return jsonify(classification)

@app.route("/classification/<id>", methods=["PUT"])
def update_classification(id: int):
    body_data = request.get_json()
    classification = ClassificationController().update_classification(id=id, data=body_data)
    return jsonify(classification)