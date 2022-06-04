from __main__ import app
from flask import request, jsonify, Blueprint
from controller.user_controller import UserController

@app.route('/login')
def login():
    body_data = request.get_json()
    user = UserController().login(data=body_data)

    return jsonify(user)


    