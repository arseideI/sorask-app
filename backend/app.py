from flask import Flask, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
mysql = MySQL(app)
app.config['MYSQL_HOST'] = '192.168.1.12'
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DATABASE")
mysql.init_app(app)


@app.route("/")
def login():
    return "Hello Hellooo"

@app.route('/teste', methods = ['POST', 'GET'])
def teste():
    if request.method == 'GET':
        return "Login via the login Form"
     
    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO TB_T_TESTE VALUES(%s,%s)''',(int(name),age))
        mysql.connection.commit()

        cursor.close()
        return f"Done!!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
