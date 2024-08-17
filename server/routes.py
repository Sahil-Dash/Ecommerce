from flask import Blueprint
from auth import signup, signin, get_user, start
from cart import add_to_cart, get_cart_prods, update_cart_quantity, delete_prod, get_prod_ids, clearCart


auth_bp = Blueprint('auth', __name__)
cart_bp = Blueprint('cart', __name__)



# Auth routes
auth_bp.route('/', methods=['GET'])(start)
auth_bp.route('/signup', methods=['POST'])(signup)
auth_bp.route('/signin', methods=['POST'])(signin)
auth_bp.route('/get-user', methods=['GET'])(get_user)


# Cart routes
cart_bp.route("/add-to-cart", methods=['POST'])(add_to_cart)
cart_bp.route("/get-cart-prods", methods=['GET'])(get_cart_prods)
cart_bp.route("/update-cart-qty", methods=['PUT'])(update_cart_quantity)
cart_bp.route("/delete-prod", methods=['DELETE'])(delete_prod)
cart_bp.route("/clear-cart", methods=['DELETE'])(clearCart)
cart_bp.route("/get-prod-ids", methods=['GET'])(get_prod_ids)






