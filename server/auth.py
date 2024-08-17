from flask import  request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
import jwt


JWT_SECRET="nxjknxkscnksd"



def start():
    return jsonify({'message': 'Server is running' , 'status':200})

def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Basic input validation (add more robust validation as needed)
    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields' , 'status':400})

    # Check if user already exists
    existing_user = User.objects(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists' , 'status':400})

    existing_email = User.objects(email=email).first()
    if existing_email:
        return jsonify({'error': 'Email already exists' , 'status':400})

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Create a new user
    user = User(username=username, email=email, password=hashed_password)
    user.save()

    # Generate a JWT token for the user
    token_data={"username":username}
    token=jwt.encode(token_data,JWT_SECRET)


    return jsonify({'message': 'User created successfully', 'token':token , 'status':200})


def signin():

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing required fields', 'status':400})

    user = User.objects(username=username).first()
    if not user:
        return jsonify({'error': 'Invalid credentials', 'status':400})

    if not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credentials', 'status':400})

    # Generate a JWT token for the user
    token_data={"username":username}
    token=jwt.encode(token_data,JWT_SECRET)


    return jsonify({'message': 'Login successful', 'token':token, 'status':200})


def get_user():
    token = request.args.get('token')
    print("Token :- ", token)

    username=jwt.decode(token,JWT_SECRET, algorithms=["HS256"])['username']

    if not username:
        return jsonify({'error': 'Username is required'}), 400

    user = User.objects(username=username).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # You can customize the returned user data here
    return jsonify({'user': {'username': user.username, 'email': user.email}}), 200