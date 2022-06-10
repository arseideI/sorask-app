from __main__ import app
from flask import request, jsonify

from controller.report_controller import ReportController

@app.route("/report", methods=["GET"])
def get_report():
    report = ReportController.get_report()
    return jsonify(report)