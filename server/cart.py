from flask import request, jsonify
from models import Cart


def add_to_cart():
    data=request.get_json()

    product_id=data['product_id']
    username=data['username']
    prodname=data['prodname']
    price=data['price']
    desc=data['desc']
    image=data['image']
    quantity=data['quantity']
    
    new_item=Cart(username=username, prodId=product_id, prodname=prodname,price=price, description=desc, image=image, quantity=quantity)
    new_item.save()
    
    return jsonify({"message": "Item added to cart"}), 200


def get_cart_prods():
    username=request.args.get('username')
    
    cart_items=Cart.objects(username=username)
    print(username)
    
    output=[{'id': item.prodId, 'name': item.prodname, 'image': item.image,'price':item.price, 'desc':item.description, 'qty': item.quantity} for item in cart_items]
    print("output :- ",output)
    
    return jsonify({"cart_items": output}), 200


def update_cart_quantity():
    data=request.get_json()
    
    username=data['username']
    prodId=data['prodId']
    type=data['type']
    qty=data['qty']

    if type=="inc":
        Cart.objects(username=username, prodId=prodId).update(inc__quantity=1)
    else:
        if qty!=0:
            Cart.objects(username=username, prodId=prodId).update(dec__quantity=1)
    
    return jsonify({"message": "Quantity updated"}), 200


def delete_prod():
    data=request.get_json()
    
    username=data['username']
    prodId=data['prodId']
    
    Cart.objects(username=username, prodId=prodId).delete()
    
    return jsonify({"message": "Product deleted from cart"}), 200


def clearCart():
    username=request.get_json()['username']
    print(username)
    
    Cart.objects(username=username).delete()
    
    return jsonify({"message": "Cart cleared"}), 200


def get_prod_ids():
    username=request.args.get('username')

    cart_items=Cart.objects(username=username)
    
    output=[item.prodId for item in cart_items]
    
    return jsonify({"product_ids": output}), 200