from mongoengine import Document, StringField, EmailField, IntField

class User(Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)

class Cart(Document):
    username = StringField(required=True)
    prodId = StringField(required=True)
    prodname = StringField(required=True)
    description=StringField(required=True)
    price=StringField(required=True)
    image = StringField(required=True)
    quantity = IntField(max_value=100)