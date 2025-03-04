from flask import jsonify, request
from config import app, db
from models import Report, User

@app.route("/create-report", methods=["POST"])
def create_reports():
    email = request.json.get("user_email")
    latitude = request.json.get("latitude")
    longitude = request.json.get("longitude")

    if not email or not latitude or not longitude:
        return jsonify({"message": "You must be logged in and submit valid coordinates to submit a report"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found!"}), 404

    new_report = Report(user_id=user.user_id, latitude=latitude, longitude=longitude)

    try:
        db.session.add(new_report)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Report created!"}), 201

@app.route("/delete-report/<int:report_id>", methods=["DELETE"])
def delete_report(report_id):
    report = Report.query.get(report_id)
    
    if not report:
        return jsonify({"message": "Report not found!"}), 404

    # Ensure only the report's owner can delete it
    user_email = request.json.get("user_email")
    user = User.query.filter_by(email=user_email).first()

    if not user or report.user_id != user.user_id:
        return jsonify({"message": "Unauthorized: You can only delete your own reports."}), 403

    db.session.delete(report)
    db.session.commit()

    return jsonify({"message": "Report deleted."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
