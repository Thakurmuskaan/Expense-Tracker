from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

DB_FILE = "db.json"

# Load DB
def load_db():
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w") as f:
            json.dump({"expenses": []}, f)
    with open(DB_FILE, "r") as f:
        return json.load(f)

# Save DB
def save_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)


@app.route("/expenses", methods=["GET"])
def get_expenses():
    db = load_db()
    return jsonify(db["expenses"])


@app.route("/expenses", methods=["POST"])
def add_expense():
    db = load_db()
    expense = request.json
    expense["id"] = int(os.urandom(3).hex(), 16)
    db["expenses"].append(expense)
    save_db(db)
    return jsonify({"message": "Expense added", "expense": expense})


@app.route("/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):
    db = load_db()
    db["expenses"] = [e for e in db["expenses"] if e["id"] != id]
    save_db(db)
    return jsonify({"message": "Expense deleted"})


@app.route("/")
def home():
    return "Expense Tracker API Running!"


if __name__ == "__main__":
    app.run(debug=True)
