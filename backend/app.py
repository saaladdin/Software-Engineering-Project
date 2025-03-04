from flask import jsonify, request
from config import app, db
from models import User

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


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
