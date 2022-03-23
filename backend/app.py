from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DATABASE")
 
mysql = MySQL(app)

@app.route("/")
def login():
    return "Hello Hellooo"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
