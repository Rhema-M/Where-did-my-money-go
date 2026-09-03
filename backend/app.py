from flask import Flask
from flask_cors import CORS
from routes.transactions import transactions_bp
from routes.analytics import analytics_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(transactions_bp)
app.register_blueprint(analytics_bp)

@app.route("/")
def home():
    return {"message": "Where Did My Money Go API is running"}

if __name__ == "__main__":
    app.run(debug=True)
