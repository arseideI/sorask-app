from flask import Flask, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# # Configurações do Banco
mysql = MySQL(app)
app.config['MYSQL_HOST'] = '192.168.1.12'
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DATABASE")

@app.route("/")
def index():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM nurses''')
    mysql.connection.commit()

    cursor.close()
    return "Conectado"
# Import Rotas Blueprints


from router.login_router import login_bp
from router.patient_router import patient_bp


# Registro de rotas
app.register_blueprint(login_bp)
app.register_blueprint(patient_bp)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
