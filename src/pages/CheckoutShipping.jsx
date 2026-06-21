import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutShipping() {
  const navigate = useNavigate();
  const { cart, shippingDetails, setShippingDetails, getCartSubtotal } = useCart();

  const [formData, setFormData] = useState(shippingDetails);

  const subtotal = getCartSubtotal();
  const shippingCost = subtotal > 25000 ? 0 : 1500;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShippingDetails(formData);
    navigate('/checkout/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-xxl">
        <h3 className="font-headline-section text-xl text-primary font-bold">Your cart is empty</h3>
        <button onClick={() => navigate('/')} className="mt-md bg-primary text-white px-lg py-sm rounded-lg font-bold cursor-pointer">
          Go Shop
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-xl">
      {/* Checkout Steps Indicator */}
      <div className="flex justify-center items-center gap-sm md:gap-lg mb-xxl text-xs md:text-sm font-semibold max-w-lg mx-auto border-b border-border/20 pb-md">
        <span className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span> Shipping
        </span>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
        <span className="text-on-surface-variant flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-[10px]">2</span> Payment
        </span>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
        <span className="text-on-surface-variant flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-[10px]">3</span> Confirmation
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7 bg-white p-lg rounded-xl border border-border/30 shadow-sm space-y-lg">
          <h2 className="font-headline-section text-2xl text-primary font-bold">
            Shipping Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-md text-sm font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-on-surface-variant uppercase font-bold text-[10px] tracking-wider" htmlFor="name">
                  Full Name
                </label>
                <input
                  required
                  className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-on-surface-variant uppercase font-bold text-[10px] tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <input
                  required
                  className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-on-surface-variant uppercase font-bold text-[10px] tracking-wider" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  required
                  className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="e.g. 0300-1234567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-on-surface-variant uppercase font-bold text-[10px] tracking-wider" htmlFor="city">
                  City
                </label>
                <input
                  required
                  className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary"
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-on-surface-variant uppercase font-bold text-[10px] tracking-wider" htmlFor="address">
                Street Address
              </label>
              <textarea
                required
                rows="3"
                className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary resize-none"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-md pt-md border-t border-border/30">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="border-2 border-primary text-primary px-xl py-md rounded-lg font-bold hover:bg-surface-container-low transition-all cursor-pointer text-sm"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-grow bg-primary text-white py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 shadow-md cursor-pointer text-sm"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-lg rounded-xl border border-border/30 shadow-sm space-y-md w-full">
          <h3 className="font-headline-section text-xl text-primary font-bold border-b border-border/40 pb-sm">
            Items Summary
          </h3>

          <div className="divide-y divide-border/40 max-h-60 overflow-y-auto scrollbar-hide">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="flex justify-between py-sm text-sm font-medium gap-md">
                <div className="flex gap-sm items-center">
                  <div className="w-12 h-12 bg-surface rounded overflow-hidden border border-border/30 flex-shrink-0">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <h4 className="text-primary font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant">
                      Color: {item.color} x {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-primary font-bold flex-shrink-0">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 pt-md space-y-sm text-sm font-medium">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="text-primary font-semibold">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Shipping</span>
              <span className={`font-semibold ${shippingCost === 0 ? 'text-success' : 'text-primary'}`}>
                {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost.toLocaleString()}`}
              </span>
            </div>
            <div className="border-t border-border/40 pt-md flex justify-between text-base font-bold text-primary">
              <span>Total Amount</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
