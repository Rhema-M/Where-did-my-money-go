from flask import Blueprint, request, jsonify
from database import get_connection
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/register", methods=["POST"])
def register():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Invalid or missing JSON body"
        }), 400

    required_fields = ["name", "email", "password"]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"{field} is required"
            }), 400

        if not data["name"].strip():
            return jsonify({
            "error": "Name cannot be empty"
        }), 400

    if not data["email"].strip():
        return jsonify({
            "error": "Email cannot be empty"
        }), 400

    if len(data["password"]) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters"
        }), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT id
        FROM user
        WHERE email = %s
    """, (data["email"],))

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        conn.close()

        return jsonify({
            "error": "Email already registered"
        }), 409
    
    password_hash = generate_password_hash(data["password"])

    cursor.execute("""
        INSERT INTO user (name, email, password_hash)
        VALUES (%s, %s, %s)
    """, (
        data["name"],
        data["email"],
        password_hash
    ))

    conn.commit()

    user_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return jsonify({
        "message": "User registered successfully",
        "user_id": user_id
    }), 201

@auth_bp.route("/auth/login", methods=["POST"])
def login():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Invalid or missing JSON body"
        }), 400

    required_fields = ["email", "password"]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"{field} is required"
            }), 400

    if not data["email"].strip():
            return jsonify({
                "error": "Email can't be empty"
            }), 400

    if not data["password"]:
        return jsonify({
            "error": "Password can't be empty"
        }), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, name, email, password_hash
        FROM user
        WHERE email = %s
    """, (data["email"],))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user is None:
        return jsonify({
            "error": "Invalid email or password"
        }), 400

    if not check_password_hash(user["password_hash"], data["password"]):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity=str(user["id"]),
        additional_claims={
            "name": user["name"],
            "email": user["email"]
        }
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }), 200




