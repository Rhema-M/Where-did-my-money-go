from flask import Flask, render_template
from flask_cors import CORS
from routes.transactions import transactions_bp
from routes.analytics import analytics_bp
from flask_cors import CORS
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__, template_folder="../frontend", static_folder="../frontend", static_url_path="/static")
app.config["JWT_SECRET_KEY"] = "your-super-secret-key-change-this"
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

if __name__ == "__main__":
    app.run(debug=True)
