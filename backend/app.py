import os
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_cors import CORS
from routes.transactions import transactions_bp
from routes.analytics import analytics_bp
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager


load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is not configured.")

app = Flask(__name__, template_folder="../frontend", static_folder="../frontend", static_url_path="/static")
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(transactions_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/register")
def register():
    return render_template("register.html")

if __name__ == "__main__":
    app.run()
