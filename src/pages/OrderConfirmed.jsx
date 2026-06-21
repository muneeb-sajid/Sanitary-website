import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function OrderConfirmed() {
  const navigate = useNavigate();
  const { latestOrderId, orders, shippingDetails } = useCart();

  // Find latest order details or default to first completed order
  const orderDetails = orders.find(o => o.orderId === latestOrderId) || orders[0] || {
    orderId: 'ORD-583726',
    total: 42500,
    paymentMethod: 'cod',
    date: new Date().toLocaleDateString(),
    items: []
  };

  const handleSupportWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sanitary.pk, I need support regarding my order ${orderDetails.orderId}.`
    );
    window.open(`https://wa.me/924211172675?text=${text}`, '_blank');
  };

  const methodLabels = {
    cod: 'Cash on Delivery (COD)',
    bank: 'Direct Bank Transfer',
    card: 'Credit or Debit Card'
  };

  return (
    <main className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-xl">
      {/* Checkout Steps Indicator */}
      <div className="flex justify-center items-center gap-sm md:gap-lg mb-xxl text-xs md:text-sm font-semibold max-w-lg mx-auto border-b border-border/20 pb-md">
        <span className="text-success font-bold flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-success text-white flex items-center justify-center text-[10px]">✓</span> Shipping
        </span>
        <span className="material-symbols-outlined text-[16px] text-success">chevron_right</span>
        <span className="text-success font-bold flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-success text-white flex items-center justify-center text-[10px]">✓</span> Payment
        </span>
        <span className="material-symbols-outlined text-[16px] text-success">chevron_right</span>
        <span className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-xs">
          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</span> Confirmation
        </span>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-lg md:p-xl rounded-xl border border-border/30 shadow-sm text-center space-y-lg">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto text-success">
          <span className="material-symbols-outlined text-5xl font-bold animate-bounce">check_circle</span>
        </div>

        <div className="space-y-sm">
          <h1 className="font-headline-section text-3xl text-primary font-bold">
            Order Confirmed!
          </h1>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed max-w-md mx-auto">
            Thank you for choosing Sanitary.pk. Your order has been received and is being processed by our team.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-surface-container-low p-lg rounded-xl border border-border/30 text-left space-y-md text-sm font-medium">
          <div className="grid grid-cols-2 gap-sm border-b border-border/40 pb-sm text-primary">
            <div>
              <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">Order Reference</p>
              <p className="font-bold text-base mt-0.5">{orderDetails.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">Order Date</p>
              <p className="font-bold text-base mt-0.5">{orderDetails.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md text-primary">
            <div>
              <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">Deliver To</p>
              <p className="font-bold mt-1">{shippingDetails.name || 'Ahmed Salman'}</p>
              <p className="text-xs text-on-surface-variant leading-normal mt-0.5">
                {shippingDetails.address || 'Plot 123, Block-Y, DHA Phase 3, Lahore'}
              </p>
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">Payment Method</p>
              <p className="font-bold mt-1">{methodLabels[orderDetails.paymentMethod] || 'Cash on Delivery'}</p>
              <p className="text-xs text-on-surface-variant leading-normal mt-0.5">
                {orderDetails.paymentMethod === 'bank'
                  ? 'Verify transaction statement via WhatsApp.'
                  : 'Pay cash when items are delivered to your door.'}
              </p>
            </div>
          </div>

          <div className="border-t border-border/40 pt-sm flex justify-between items-center text-primary">
            <span className="text-on-surface-variant">Amount Paid</span>
            <span className="font-bold text-base">Rs. {orderDetails.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-md pt-md max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex-grow bg-primary text-on-primary py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 shadow-md cursor-pointer text-sm"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleSupportWhatsApp}
            className="flex-grow border-2 border-primary text-primary py-md font-bold rounded-lg hover:bg-surface-container-low transition-all duration-300 cursor-pointer text-sm flex items-center justify-center gap-xs"
          >
            Support via WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}
