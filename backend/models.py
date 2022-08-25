from flask import Flask
from flask_pymongo import PyMongo
app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/Users"
db = PyMongo(app)

# # Database ORMs
class User(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	public_id = db.Column(db.String(50), unique = True)
	name = db.Column(db.String(100))
	email = db.Column(db.String(70), unique = True)
	password = db.Column(db.String(80))

# class User(UserMixin, mongodb.Model):
#     __collection__ = "test"

#     _id = mongodb.db.test(mongodb.db)