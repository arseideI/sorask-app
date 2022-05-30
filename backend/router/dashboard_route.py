from __main__ import app
from flask import request, jsonify

from controller.classification_controller import ClassificationController

@app.route("/dashboard", methods=["GET"])
def get_dashboard():
    report = ClassificationController().get_dash()
    return jsonify(report)