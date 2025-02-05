import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cart-slice.js";
import { Button } from "@/components/ui/button";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;

  return (
    <div className="p-6 bg-[#F9F9F9]">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
          {/* Cart Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between py-4 border-b"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/default_image.jpg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Premium grade {item.name.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">₹{item.price}</p>
                  <Button
                    variant="link"
                    className="text-red-500"
                    onClick={() => dispatch(removeFromCart(item.productId))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>
            <Button className="w-full bg-black text-white py-2 rounded-lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
