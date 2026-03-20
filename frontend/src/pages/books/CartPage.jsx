import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * (item.quantity || 1), 0)
    .toFixed(2);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty > 0) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-20 px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Shopping Cart</h1>
          <p className="text-slate-500 mt-1">You have {cartItems.length} items in your cart</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            <FiTrash2 />
            Clear Cart
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={product?._id} className="premium-card p-4 flex gap-6 items-center">
                <div className="h-24 w-24 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-sm">
                  <img
                    alt={product?.title}
                    src={getImgUrl(product?.coverImage)}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <Link to={`/books/${product?._id}`} className="hover:text-primary transition-colors">
                      <h3 className="text-lg font-bold text-secondary truncate">{product?.title}</h3>
                    </Link>
                    <p className="text-lg font-bold text-secondary">${(product?.newPrice * (product?.quantity || 1)).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 capitalize">{product?.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button 
                        onClick={() => handleUpdateQuantity(product._id, (product.quantity || 1) - 1)}
                        className="p-1 px-2 hover:bg-white rounded-md transition-all text-slate-600"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-bold text-sm">{product.quantity || 1}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(product._id, (product.quantity || 1) + 1)}
                        className="p-1 px-2 hover:bg-white rounded-md transition-all text-slate-600"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveFromCart(product._id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <HiOutlineShoppingCart className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-secondary mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/" className="btn-primary">
                Return to Shop
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <div className="premium-card p-6 sticky top-28">
              <h2 className="text-xl font-bold text-secondary mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-medium">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <span className="text-lg font-bold text-secondary">Total</span>
                  <span className="text-2xl font-black text-primary">${totalPrice}</span>
                </div>
              </div>
              
              <Link to="/checkout" className="btn-primary w-full text-center">
                Checkout Now
              </Link>
              
              <p className="mt-4 text-center text-xs text-slate-400">
                Secure SSL Encryption & 100% Satisfaction Guarantee
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}