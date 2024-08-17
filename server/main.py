from flask import Flask
from flask_cors import CORS
from mongoengine import connect
from routes import auth_bp, cart_bp

app = Flask(__name__)

CORS(app)  

connect(
    db="Ecom",
    # host="mongodb://localhost:27017"   local host
    host="mongodb+srv://sahildash386:1nS0jmzMGy3OxXHw@cluster0.7ypmskq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

app.register_blueprint(auth_bp)
app.register_blueprint(cart_bp)


app.run(debug=True)

