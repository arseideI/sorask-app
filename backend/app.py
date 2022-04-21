from flask import Flask
from flask_cors import CORS

# App initialization
app = Flask(__name__)

#CORS config
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# Route register
from router import login_router
from router import patient_router


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
