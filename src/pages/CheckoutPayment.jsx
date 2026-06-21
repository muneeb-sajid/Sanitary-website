import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const {
    cart,
    shippingDetails,
    paymentMethod,
    setPaymentMethod,
    getCartSubtotal,
    placeOrder
  } = useCart();

  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const subtotal = getCartSubtotal();
  const shippingCost = subtotal > 25000 ? 0 : 1500;
  const total = subtotal + shippingCost;

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert('Please fill in card payment details.');
        return;
      }
    }
    const orderId = placeOrder();
    navigate('/checkout/order-confirmed');
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
        <span
          onClick={() => navigate('/checkout/shipping')}
          className="text-on-surface-variant cursor-pointer hover:text-primary flex items-center gap-xs"
        >
          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">✓</span> Shipping
        </span>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
        <span className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span> Payment
        </span>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
        <span className="text-on-surface-variant flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center text-[10px]">3</span> Confirmation
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl items-start">
        {/* Payment Options Selection */}
        <div className="lg:col-span-7 bg-white p-lg rounded-xl border border-border/30 shadow-sm space-y-lg">
          <h2 className="font-headline-section text-2xl text-primary font-bold">
            Select Payment Method
          </h2>

          <form onSubmit={handleCompleteOrder} className="space-y-lg text-sm font-medium">
            <div className="space-y-md">
              {/* Cash On Delivery Option */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-start gap-md p-md rounded-xl border cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  paymentMethod === 'cod' ? 'border-primary' : 'border-border'
                }`}>
                  {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Cash on Delivery (COD)</h4>
                  <p className="text-on-surface-variant text-xs mt-1 leading-normal font-medium">
                    Pay with cash upon delivery of your items. Available nationwide.
                  </p>
                </div>
              </label>

              {/* Direct Bank Transfer Option */}
              <label
                onClick={() => setPaymentMethod('bank')}
                className={`flex items-start gap-md p-md rounded-xl border cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  paymentMethod === 'bank' ? 'border-primary' : 'border-border'
                }`}>
                  {paymentMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-primary text-base">Direct Bank Transfer</h4>
                  <p className="text-on-surface-variant text-xs mt-1 leading-normal font-medium">
                    Transfer funds directly into our corporate bank account. Share transaction receipt via WhatsApp.
                  </p>
                  {paymentMethod === 'bank' && (
                    <div className="mt-md bg-surface p-md rounded-lg border border-border/50 space-y-sm text-xs font-semibold text-primary select-text">
                      <p>🏦 Bank: Bank Alfalah Limited</p>
                      <p>👤 Account Name: Sanitary.pk Premium (Pvt) Ltd</p>
                      <p>🔢 Account Number: 0123-100234567</p>
                      <p>🔏 IBAN: PK45ALFH0123100234567</p>
                    </div>
                  )}
                </div>
              </label>

              {/* Credit / Debit Card Option */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-start gap-md p-md rounded-xl border cursor-pointer transition-all duration-300 ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  paymentMethod === 'card' ? 'border-primary' : 'border-border'
                }`}>
                  {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-primary text-base">Credit or Debit Card</h4>
                  <p className="text-on-surface-variant text-xs mt-1 leading-normal font-medium">
                    Secure checkout using Visa, Mastercard, or UnionPay.
                  </p>
                  {paymentMethod === 'card' && (
                    <div className="mt-md space-y-sm max-w-sm">
                      <div className="flex flex-col gap-xs">
                        <label className="text-[10px] uppercase font-bold text-on-surface-variant" htmlFor="number">
                          Card Number
                        </label>
                        <input
                          required
                          className="bg-white border border-border rounded-lg px-md py-sm text-xs focus:ring-1 focus:ring-primary focus:outline-none text-primary"
                          id="number"
                          name="number"
                          placeholder="4000 1234 5678 9010"
                          type="text"
                          value={cardDetails.number}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-sm">
                        <div className="flex flex-col gap-xs">
                          <label className="text-[10px] uppercase font-bold text-on-surface-variant" htmlFor="expiry">
                            Expiry (MM/YY)
                          </label>
                          <input
                            required
                            className="bg-white border border-border rounded-lg px-md py-sm text-xs focus:ring-1 focus:ring-primary focus:outline-none text-primary"
                            id="expiry"
                            name="expiry"
                            placeholder="12/28"
                            type="text"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                          />
                        </div>
                        <div className="flex flex-col gap-xs">
                          <label className="text-[10px] uppercase font-bold text-on-surface-variant" htmlFor="cvv">
                            CVV
                          </label>
                          <input
                            required
                            className="bg-white border border-border rounded-lg px-md py-sm text-xs focus:ring-1 focus:ring-primary focus:outline-none text-primary"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            type="password"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div className="flex gap-md pt-md border-t border-border/30">
              <button
                type="button"
                onClick={() => navigate('/checkout/shipping')}
                className="border-2 border-primary text-primary px-xl py-md rounded-lg font-bold hover:bg-surface-container-low transition-all cursor-pointer text-sm"
              >
                Back to Shipping
              </button>
              <button
                type="submit"
                className="flex-grow bg-primary text-on-primary py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 shadow-md cursor-pointer text-sm"
              >
                Place Order (Rs. {total.toLocaleString()})
              </button>
            </div>
          </form>
        </div>

        {/* Order Details Sidebar Summary */}
        <div className="lg:col-span-5 bg-white p-lg rounded-xl border border-border/30 shadow-sm space-y-md w-full">
          <h3 className="font-headline-section text-xl text-primary font-bold border-b border-border/40 pb-sm">
            Deliver To
          </h3>
          <div className="text-xs font-semibold text-primary space-y-1">
            <p className="font-bold text-sm text-primary">{shippingDetails.name}</p>
            <p>{shippingDetails.address}</p>
            <p>{shippingDetails.city}, Pakistan</p>
            <p>📞 {shippingDetails.phone}</p>
            <p>✉️ {shippingDetails.email}</p>
          </div>

          <h3 className="font-headline-section text-xl text-primary font-bold border-b border-border/40 pb-sm pt-sm">
            Items Summary
          </h3>
          <div className="divide-y divide-border/40 max-h-40 overflow-y-auto scrollbar-hide">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="flex justify-between py-sm text-sm font-medium gap-md">
                <span className="text-primary truncate">
                  {item.name} <span className="text-xs text-on-surface-variant font-semibold">({item.color} x{item.quantity})</span>
                </span>
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
