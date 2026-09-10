from flask import Blueprint, jsonify
from database import get_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics/summary", methods=["GET"])
@jwt_required()
def get_summary():

    user_id = get_jwt_identity()

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT COALESCE(SUM(amount),0) AS total_income
        FROM transaction
        WHERE transaction_type='income'
        AND user_id = %s
    """, (user_id,))

    income = cursor.fetchone()["total_income"]

    cursor.execute("""
        SELECT COALESCE(SUM(amount),0) AS total_expenses
        FROM transaction
        WHERE transaction_type='expense'
        AND user_id = %s
    """, (user_id,))

    expenses = cursor.fetchone()["total_expenses"]

    balance = income - expenses

    cursor.close()
    conn.close()

    return jsonify({
        "income": float(income),
        "expenses": float(expenses),
        "balance": float(balance)
    })

@analytics_bp.route("/analytics/categories", methods=["GET"])
@jwt_required()
def category_breakdown():

    user_id = get_jwt_identity()

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT c.name AS category, SUM(t.amount) AS total
        FROM transaction t
        JOIN category c
            ON t.category_id=c.id
        WHERE t.transaction_type='expense'
        AND t.user_id = %s
        GROUP BY c.name
        ORDER BY total DESC
    """, (user_id,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@analytics_bp.route("/analytics/trend", methods=["GET"])
@jwt_required()
def spending_trend():

    user_id = get_jwt_identity()

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT transaction_date, SUM(amount) AS total
        FROM transaction
        WHERE transaction_type='expense'
        AND user_id = %s
        GROUP BY transaction_date
        ORDER BY transaction_date
    """, (user_id,))

    trend = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(trend)

