import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartSubtotal
  } = useCart();

  const subtotal = getCartSubtotal();
  const isFreeShipping = subtotal > 25000;
  const shippingCost = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 1500);
  const total = subtotal + shippingCost;

  return (
    <main className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-xs text-ui-small font-ui-small text-on-surface-variant mb-lg font-medium">
        <button onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Home</button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface font-semibold">Shopping Cart</span>
      </nav>

      <h1 className="font-display-hero text-3xl md:text-display-hero-mobile text-primary font-bold mb-xxl border-b border-border/30 pb-sm">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-xxl bg-white rounded-xl border border-border/30 shadow-sm">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-md opacity-40">
            shopping_basket
          </span>
          <h3 className="font-headline-section text-xl text-primary font-bold">Your Cart is Empty</h3>
          <p className="text-on-surface-variant text-sm mt-xs max-w-sm mx-auto px-lg">
            Looks like you haven't added any luxury hardware to your cart yet. Explore our showroom collection.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-lg bg-primary text-on-primary px-xl py-md rounded-lg font-bold hover:bg-secondary transition-all cursor-pointer shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-md">
            <div className="hidden md:grid grid-cols-12 text-ui-small font-semibold text-on-surface-variant border-b border-border pb-sm px-md">
              <span className="col-span-6">Product Details</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <div className="divide-y divide-border/60">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="grid grid-cols-1 md:grid-cols-12 items-center gap-md py-md px-md bg-white rounded-lg border border-border/20 md:border-none shadow-sm md:shadow-none"
                >
                  {/* Product Details (Image, Title, Variant) */}
                  <div className="col-span-1 md:col-span-6 flex gap-md items-center">
                    <div className="w-20 h-20 bg-surface rounded-lg overflow-hidden border border-border/50 flex-shrink-0">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary tracking-wide">{item.brand}</p>
                      <h4 className="font-card-title text-primary text-sm font-bold line-clamp-1 hover:text-secondary cursor-pointer" onClick={() => navigate(`/product/${item.slug || 'master-one-piece-commode'}`)}>
                        {item.name}
                      </h4>
                      <p className="text-ui-small text-on-surface-variant mt-0.5">
                        Color: <span className="font-semibold text-on-surface">{item.color}</span>
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="text-ui-small text-danger hover:underline mt-sm flex items-center gap-xs cursor-pointer font-semibold"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center flex justify-between md:block">
                    <span className="md:hidden text-ui-small font-semibold text-on-surface-variant">Price:</span>
                    <span className="font-semibold text-primary">Rs. {item.price.toLocaleString()}</span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-ui-small font-semibold text-on-surface-variant">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg bg-surface-container-low shadow-sm">
                      <button
                        className="px-sm py-0.5 hover:bg-surface-container transition-colors font-bold cursor-pointer"
                        onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        className="w-8 text-center border-none bg-transparent text-xs font-bold focus:ring-0 focus:outline-none"
                        readOnly
                        type="number"
                        value={item.quantity}
                      />
                      <button
                        className="px-sm py-0.5 hover:bg-surface-container transition-colors font-bold cursor-pointer"
                        onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="col-span-1 md:col-span-2 text-right flex justify-between md:block border-t border-border/10 md:border-none pt-xs md:pt-0">
                    <span className="md:hidden text-ui-small font-semibold text-on-surface-variant">Total:</span>
                    <span className="font-bold text-primary">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/')}
              className="border-2 border-primary text-primary px-lg py-md rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-pointer text-sm shadow-sm flex items-center gap-xs"
            >
              <span className="material-symbols-outlined text-[18px]">keyboard_backspace</span> Continue Shopping
            </button>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white p-lg rounded-xl border border-border/30 shadow-sm space-y-md w-full">
            <h3 className="font-headline-section text-xl text-primary font-bold border-b border-border/40 pb-sm">
              Order Summary
            </h3>

            <div className="space-y-md text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary font-semibold">Rs. {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-surface-variant">Estimated Shipping</span>
                <span className={`font-semibold ${shippingCost === 0 ? 'text-success' : 'text-primary'}`}>
                  {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost.toLocaleString()}`}
                </span>
              </div>

              {shippingCost > 0 && (
                <div className="bg-primary/5 p-sm rounded-lg border border-primary/10 text-[11px] text-primary leading-relaxed font-semibold">
                  💡 Add <strong>Rs. {(25001 - subtotal).toLocaleString()}</strong> more to get <strong>FREE delivery</strong>!
                </div>
              )}

              <div className="border-t border-border/40 pt-md flex justify-between text-base font-bold">
                <span className="text-primary">Total Amount</span>
                <span className="text-primary">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout/shipping')}
              className="w-full bg-primary text-on-primary py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-sm shadow-md active:scale-95 cursor-pointer text-sm"
            >
              Proceed to Shipping <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Promo Code placeholder */}
            <div className="pt-md border-t border-border/30">
              <details className="cursor-pointer group">
                <summary className="text-xs font-semibold text-on-surface-variant select-none hover:text-primary flex items-center justify-between">
                  Apply Promo Code
                  <span className="material-symbols-outlined text-[16px] group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="flex gap-xs mt-sm" onClick={(e) => e.stopPropagation()}>
                  <input
                    className="bg-surface-container-low border border-border/50 rounded-lg px-md py-sm text-xs flex-grow focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                    placeholder="Enter code"
                    type="text"
                  />
                  <button
                    onClick={() => alert('Coupon code invalid or expired.')}
                    className="bg-surface border border-border px-md py-sm rounded-lg font-bold text-xs text-primary hover:bg-surface-container-low cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
