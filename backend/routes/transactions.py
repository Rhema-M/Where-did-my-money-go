from flask import Blueprint, request, jsonify
from database import get_connection

transactions_bp = Blueprint("transactions", __name__)

@transactions_bp.route("/transactions", methods=["POST"])
def  create_transaction():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Invalid or missing JSON body"
        }), 400

    required_fields = [
        "user_id", "category_id", "title", "amount", "transaction_type", "transaction_date"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"{field} is required"
            }), 400

    if not isinstance(data["amount"], (int, float)) or data["amount"] <= 0:
        return jsonify({
            "error": "Amount must be greater than 0"
        }), 400

    if data["transaction_type"] not in ["income", "expense"]:
        return jsonify({
            "error": "Transaction type must be income or expense"
        }), 400

    if not isinstance(data["category_id"], int):
        return jsonify({
            "error": "category_id must be an integer"
        }), 400

    if not data["title"].strip():
        return jsonify({
            "error": "Title cannot be empty"
        }), 400

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO transaction
    (user_id, category_id, title, amount, transaction_type, transaction_date, notes)

    VALUES (%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data["user_id"],
        data["category_id"],
        data["title"],
        data["amount"],
        data["transaction_type"],
        data["transaction_date"],
        data.get("notes")
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Transaction added"}), 201

@transactions_bp.route("/transactions", methods=["GET"])
def get_transactions():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT t.id, t.user_id, t.category_id, c.name AS category, t.title, t.amount, t.transaction_type, t.transaction_date, t.notes, t.created_at
        FROM transaction t
        JOIN category c
            ON t.category_id = c.id
        ORDER BY t.transaction_date DESC
    """)

    transactions = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(transactions), 200

@transactions_bp.route("/transactions/<int:id>", methods=["GET"])
def get_transaction(id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
    SELECT t.id, t.user_id, t.category_id, c.name AS category, t.title, t.amount, t.transaction_type, t.transaction_date, t.notes, t.created_at
        FROM transaction t
        JOIN category c
            ON t.category_id = c.id
        WHERE t.id = %s
    """, (id,))

    transaction = cursor.fetchone()

    cursor.close()
    conn.close()

    if transaction is None:
        return jsonify({
            "error": "Transaction not found"
        }), 404

    return jsonify(transaction), 200

@transactions_bp.route("/transactions/<int:id>", methods=["PUT"])
def update_transaction(id):

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Invalid or missing JSON body"
        }), 400

    required_fields = [
        "category_id", "title", "amount", "transaction_type", "transaction_date" 
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"{field} is required"
            }), 400

    if not isinstance(data["amount"], (int, float)) or data["amount"] <= 0:
        return jsonify({
            "error": "Amount must be greater than 0"
        }), 400

    if data["transaction_type"] not in ["income", "expense"]:
        return jsonify({
            "error": "Transaction type must be income or expense"
        }), 400

    if not isinstance(data["category_id"], int):
        return jsonify({
            "error": "category_id must be an integer"
        }), 400

    if not data["title"].strip():
        return jsonify({
            "error": "Title cannot be empty"
        }), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    UPDATE transaction
    SET category_id =%s, title = %s, amount = %s, transaction_type = %s, transaction_date = %s, notes =%s
    WHERE id =%s
    """, (
        data["category_id"], data["title"], data["amount"], data["transaction_type"], data["transaction_date"], data.get("notes"), id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return jsonify({
            "EROOR": "TRANSACTION NOT FOUND"
        }), 404

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Transaction updated successfully"
    }), 200

@transactions_bp.route("/transactions/<int:id>", methods=["DELETE"])
def delete_transaction(id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    DELETE FROM transaction
    WHERE id = %s
    """, (id,))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return jsonify({
            "error": "Transaction not found"
        }), 404

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Transaction deleted successfully"
    }), 200

