from flask import Blueprint, jsonify
from database import get_connection

analytics_bp = Blueprint("analytics", __name__)

