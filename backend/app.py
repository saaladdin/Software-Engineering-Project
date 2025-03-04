from flask import jsonify, request, session
from config import app, db
from models import *

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    new_user = User(email=email, name=name)
    new_user.set_password(password)  # Hash password before saving

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json()
    name = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message" : "Invalid email or password"}), 401
    
    session["user_id"] = user.id
    session["user_name"] = user.name 

    return jsonify({"message": "Logout successful"}), 200

@app.route("/get_users", methods=["GET"])
def get_users():
    users = User.query.all()  # Fetch all users
    user_list = [user.to_json() for user in users]  # Convert each user to JSON format
    
    return jsonify(user_list), 200  # Return the list of users with a 200 status code

@app.route("/profile", methods=["GET"])
def profile():
    if not session["user_name"]:
        return jsonify({"message": "Not logged in"}), 400
    
    return jsonify({"user": session["user_name"]}), 200

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("DB initialized")

    app.run(debug=True)
