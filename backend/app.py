from flask import Flask
from flask_cors import CORS
from routes.transactions import transactions_bp
from routes.analytics import analytics_bp
from flask_cors import CORS
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your-super-secret-key-change-this"
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(transactions_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return {"message": "Where Did My Money Go API is running"}

if __name__ == "__main__":
    app.run(debug=True)
