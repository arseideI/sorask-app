from __main__ import app
from crypt import methods
from flask import request, jsonify, Blueprint
from controller.user_controller import UserController

@app.route('/login', methods=["POST"])
def login():
    body_data = request.get_json()
    print("loginnnnnnnn================: ", body_data)
    user = UserController().login(data=body_data)

    return jsonify(user)


    