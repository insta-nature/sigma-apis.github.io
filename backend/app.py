#!/Users/kenga/anaconda3 python

__author__ = 'shridharkengar007@gmail.com'
__version__ = '1.1'

# from bson import ObjectId
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from flask_login import current_user
from bson.json_util import dumps, ObjectId
from flask_pymongo import PyMongo
# from sqlalchemy import true
from os import environ

from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from functools import wraps

import random
import uuid
import jwt
from dotenv import load_dotenv

from sigma import voice

load_dotenv()
obj = voice()

app = Flask("Speech Reconsecration")
app = Flask(__name__.split('.')[0])
# CORS policy:
CORS(app)
secret = app.config['SECRET_KEY'] = environ.get('SECKRET_KEY')
app.config["MONGO_URI"] = environ.get('MONGO_DB')
mongodb = PyMongo(app)
db = mongodb.db.test


# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
	    # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
		# return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401

        try:
			# decoding the payload to fetch the stored details
            data = jwt.decode(token, secret)
            # current_user = User.query\
            #     .filter_by(public_id = data['public_id'])\
            #     .first()
        except:
            return jsonify({
				'message' : 'Token is invalid !!'
			}), 401
		# returns the current logged in users contex to the routes
        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/', methods=['GET'])
def Home():
    msg = {'Messages': 'Hello, This is flask Server.'}
    data = jsonify(msg)
    return data


# Register User
@app.route('/api/register', methods=['POST'])
def register_user():

    try:
        _json = request.json
        _name = _json['username']
        _email = _json['email']
        _passwd = _json['password']
        user = db.find_one({'email': _email})

        if not user:
            # { name: 'Shree', email: 'shree@mail.com'} ?../postman
            if _name and _email and _passwd and request.method == 'POST':
                _passwd = generate_password_hash(_passwd)
                uuid4 = str(uuid.uuid4())
                id = db.insert_one({'public_id': uuid4, 'name': _name, 'email': _email, 'passwd': _passwd})
                message = {
                    'message': "Use Added Successfully.",
                    'u_id': uuid4
                }
                data = jsonify(message)
                data.status_code = 200
        else:
            msg = {'Messages':'User alredy exist.'}
            data = jsonify(msg)
    except:
        msg = {'Messages': 'All fields are Required..!'}
        data = jsonify(msg)
    finally:
        return data


@app.route('/user', methods =['GET'])
@token_required
def get_all_users(current_user):
	# querying the database
	# for all the entries in it
	users = db.find_one()
	# converting the query objects
	# to list of jsons
	output = []
	for user in users:
		# appending the user data json
		# to the response list
		output.append({
			'public_id': user.public_id,
			'name' : user.name,
			'email' : user.email
		})

	return jsonify({'users': output})

# Login User
@app.route('/users', methods=['GET'])
@token_required
def users():
    users = db.find()
    resp = dumps(users)
    return resp


@app.route('/api/login', methods=['POST'])
def login():
    try:
        _json = request.json
        _email = _json['email']
        _passwd = _json['password']

        if _email and _passwd and request.method == 'POST':
            pwd = db.find_one({'email': _email})
            check_pwd = pwd.get('passwd')
            public_id = pwd.get('public_id')

            if check_password_hash(check_pwd, _passwd):
                # create jwt_token
                token = jwt.encode({
                    'public_id': public_id,
                    'exp' : datetime.utcnow() + timedelta(minutes = 30)
                }, secret)
                msg = {'Token': token, 'name': pwd.get('name'), 'email': pwd.get('email')}
                # return make_response(jsonify({'token' : token.decode('UTF-8')}), 201)
                # # login_user(user)
                # msg = {'name': pwd.get('name'),
                #        'email': pwd.get('email')}
                data = jsonify(msg)
            else:
                msg = {'Massages': 'Password Not Match.'}
                data = jsonify(msg)
        else:
            msg = {'Massages': 'User Not Found.'}
            data = jsonify(msg)
    except:
        msg = {'Massages': 'Check Password and Email...!'}
        data = jsonify(msg)
    finally:
        return data

@app.route('/api/service/find_api_key', methods=['POST', 'GET'])
def find_api_key():
    raw = request.args.to_dict()
    pub_id = raw.get('public_id')

    key = db.find_one({'public_id': pub_id})
    api = key.get('api')
    msg = {'Massages': 'API Key Found.', 'API': api}
    data = jsonify(msg)
    print(f'api-key: {api}')
    return data

# Generate API Key
# Path / public_key
@app.route('/api/service/generate_api_key', methods=['POST'])
def generate_api_key():
    raw = request.args.to_dict()
    pub_id = raw.get('public_id')
    # p_id = pub_id.split(":")[1]
    # print(f'public_id: {pub_id.split(":")[1]}')
    print(type(pub_id))
    user = db.find_one({'public_id': pub_id})
    if user == None:
        msg = {'Massages': 'User Not Found.'}
        data = jsonify(msg)
        return data
    elif user.get('api'):
        msg = {'Massages': 'API Key Already Found.', 'API': user.get('api')}
        data = jsonify(msg)
        return data
    else:
        # uuid = str(uuid.uuid4())
        regex = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        key = ''.join(random.choice(regex) for i in range(30))

        key = db.update_one({'public_id': pub_id}, {'$set': {'api': key}})

        msg = {'Massages': 'Generated Api Key.'}
        data = jsonify(msg)
        return data
        


# /service/api?key=secret_key
# /service/api?key=secret_key&command=play song
@app.route('/service/api', methods=['GET', 'POST'])
def api_service():
    raw = request.args.to_dict()
    s_key = raw.get('key')
    command = raw.get('command')
    # print(f"COMMAND: '{command}' | KEY: '{s_key}'")
    # try error to invalid key handler.
    try:
        info = db.find_one({},{'api':s_key,'_id':0,'name':1,'email':1})
        name = info.get('name')
        email = info.get('email')
        # Flask(info)
        # info About Api users
        msg = {'name': name, 'email': email, 'Key': s_key, 'Massages': 'ALLOWED API SERVICE.'}
        # if not s_key
        if not command:
            data = {'Massages': 'not command..!'}
            data = jsonify(data)
            return data
        elif command:
            # msg = {'User ': msg.get('name'), 'Command ': command}
            print(command)
            from jsonpickle import decode
            msg = obj.cmd(command)
            data = decode(msg)
            data = {'Massages': [data]}
            return data
    except:
        data = {'Massages': 'Invalid Credentials..!'}
        data = jsonify(data)
        return data
    # finally:
    #     return data

# Public Id Used.
@app.route('/service/api/out', methods=['GET', 'POST'])
def api_WithoutKeyService():
    raw = request.args.to_dict()
    s_key = raw.get('key')
    command = raw.get('command')
    # print(f"COMMAND: '{command}' | KEY: '{s_key}'")
    # try error to invalid key handler.
    try:
        info = db.find_one({},{'public_id':s_key,'_id':0,'name':1,'email':1})
        name = info.get('name')
        email = info.get('email')
        # flash(info)
        # info About Api users
        msg = {'name': name, 'email': email, 'P_id':s_key, 'Massages': 'ALLOWED API SERVICE.'}
        # if not s_key
        if not command:
            data = {'Massages': 'not command..!'}
            data = jsonify(data)
            return data
        elif command:
            # msg = {'User ': msg.get('name'), 'Command ': command}
            print(command)
            from jsonpickle import decode
            msg = obj.cmd(command)
            data = decode(msg)
            data = {'Massages': [data]}
            return data
    except:
        data = {'Massages': 'Invalid Credentials..!'}
        data = jsonify(data)
        return data


@app.route('/user/<id>', methods=['GET'])
def user(self):
    user = db.find_one({'_id': ObjectId(self.id)})
    resp = dumps(user)
    return resp


@app.route('/delete/<id>', methods=['DELETE'])
def delete(self):
    delete = db.delete_one({'_id': ObjectId(self.id)})
    resp = jsonify("Use Deleted Successfully.")
    resp.status_code = 200
    return resp


@app.route('/update/<id>', methods=['PUT'])
def update(self):
    _id = self.id
    _json = request.json
    _name = _json['name']
    _email = _json['email']
    _passwd = _json['passwd']

    # { name: 'Shree', email: 'shree@mail.com'} ?../postman
    if _name and _email and _passwd and _id and request.method == 'PUT':
        _passwd_hash = generate_password_hash(_passwd)
        db.update_many({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId('_id')},
                                    {'$set': {'name': _name, 'email': _email, 'passwd': _passwd_hash}})

        resp = jsonify("User Updated Successfully.")
        resp.status_code = 200
        return resp
    else:
        return not_found()


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'STATUS': 404,
        'MESSAGE': 'NOT FOUND '
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp


@app.errorhandler(405)
def not_found(error=None):
    message = {
        'STATUS': 405,
        'MESSAGE': 'METHOD NOT ALLOWED '
    }
    resp = jsonify(message)
    resp.status_code = 405
    return resp


@app.errorhandler(500)
def not_found(error=None):
    message = {
        'STATUS': 500,
        'MESSAGE': 'SERVER PROBLEMS Error'
    }
    resp = jsonify(message)
    resp.status_code = 500
    return resp


if __name__ == "__main__":
    port = app.config.get("PORT", 9000)
    app.run(host="0.0.0.0", port=port, debug=True)
