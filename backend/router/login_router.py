from __main__ import app
from flask import request, jsonify, Blueprint


@app.route('/login')
def login():
    return {"Rota": "teste"}


    