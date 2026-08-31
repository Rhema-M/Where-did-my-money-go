from flask import Blueprint, jsonify
from database import get_connection

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics/summary", methods=["GET"])
def get_summary():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT COALESCE(SUM(amount),0) AS total_income
        FROM transaction
        WHERE transaction_type='income'
    """)

    income = cursor.fetchone()["total_income"]

    cursor.execute("""
        SELECT COALESCE(SUM(amount),0) AS total_expenses
        FROM transaction
        WHERE transaction_type='expense'
    """)

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
def category_breakdown():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT c.name AS category, SUM(t.amount) AS total
        FROM transaction t
        JOIN category c
            ON t.category_id=c.id
        WHERE t.transaction_type='expense'
        GROUP BY c.name
        ORDER BY total DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@analytics_bp.route("/analytics/trend", methods=["GET"])
def spending_trend():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT transaction_date, SUM(amount) AS total
        FROM transaction
        WHERE transaction_type='expense'
        GROUP BY transaction_date
        ORDER BY transaction_date
    """)

    trend = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(trend)

