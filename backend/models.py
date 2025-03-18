from config import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.organization_id'))
    password_hash = db.Column(db.String(256), nullable=False)

    org = db.relationship("Organization", backref="users")

    def __init__(self, email, name):
        self.email = email
        self.name = name

    def to_json(self):
        return {
            "user_id": self.user_id,
            "email": self.email,
        }

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Organization(db.Model):
    organization_id = db.Column(db.Integer, primary_key=True)
    name = db.Column("OrganizationName", db.String(120), unique=True, nullable=False)
    email = db.Column("OrganizationEmail", db.String(120), unique=True, nullable=False)
    phone = db.Column("OrganizationPhone", db.String(120), unique=True, nullable=False)

members = db.Table(
    "members",
    db.Column("user_id", db.Integer, db.ForeignKey("user.user_id"), primary_key=True),
    db.Column("organization_id", db.Integer, db.ForeignKey("organization.organization_id"), primary_key=True)
)
