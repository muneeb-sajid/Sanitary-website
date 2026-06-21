import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart, productsList } from '../context/CartContext';

export default function ProductDetail() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find product by slug or default to Master Commode
  const product = productsList.find(p => p.slug === productSlug) || productsList[0];

  const [activeTab, setActiveTab] = useState('desc'); // desc, specs, delivery, reviews
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image);

  // If product thumbnails is empty, use main image
  const gallery = product.thumbnails || [product.image];

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    alert(`${quantity} x ${product.name} (${selectedColor}) added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigate('/cart');
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hi Sanitary.pk, I would like to order: \n- Product: ${product.name}\n- SKU: ${product.sku || 'N/A'}\n- Color: ${selectedColor}\n- Qty: ${quantity}\n- Price: Rs. ${product.price.toLocaleString()}`
    );
    return `https://wa.me/924211172675?text=${text}`;
  };

  // Find related products in same category
  const relatedProducts = productsList
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <main className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-xs text-ui-small font-ui-small text-on-surface-variant mb-lg font-medium">
        <button onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Home</button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-primary cursor-pointer capitalize">{product.category}</button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface font-semibold line-clamp-1">{product.name}</span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl items-start">
        {/* Image Gallery */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-md">
          {/* Thumbnails */}
          <div className="hidden md:flex md:col-span-2 flex-col gap-sm">
            {gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(imgUrl)}
                className={`aspect-square border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  mainImage === imgUrl ? 'border-primary shadow-sm' : 'border-border hover:border-primary'
                }`}
              >
                <img className="w-full h-full object-cover" src={imgUrl} alt={`${product.name} thumbnail ${idx}`} />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="md:col-span-10 aspect-[4/5] bg-surface-container rounded-xl overflow-hidden relative group shadow-sm border border-border/30">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              id="main-image"
              src={mainImage}
              alt={product.name}
            />
            <button className="absolute top-4 right-4 bg-white/80 p-sm rounded-full shadow-sm hover:bg-white text-on-surface-variant hover:text-danger transition-colors cursor-pointer flex items-center justify-center">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>

          {/* Mobile Thumbnails (Horizontal) */}
          <div className="md:hidden flex gap-sm overflow-x-auto scrollbar-hide py-xs">
            {gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(imgUrl)}
                className={`min-w-[80px] aspect-square border-2 rounded-lg overflow-hidden cursor-pointer ${
                  mainImage === imgUrl ? 'border-primary' : 'border-border'
                }`}
              >
                <img className="w-full h-full object-cover" src={imgUrl} alt={`${product.name} mobile thumbnail ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col gap-md">
          <div className="flex items-center gap-sm">
            <span className="bg-primary-container text-on-primary-container px-md py-xs font-label-caps text-label-caps rounded-full font-bold">
              {product.brand.toUpperCase()} BRAND
            </span>
            <span className="text-ui-small text-on-surface-variant font-medium">SKU: {product.sku || 'MST-OPC-2024'}</span>
          </div>

          <h1 className="font-product-title text-2xl md:text-3xl lg:text-product-title text-primary font-bold leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-md">
            <div className="flex text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: product.rating % 1 !== 0 ? "'FILL' 0" : "'FILL' 1" }}>
                {product.rating % 1 !== 0 ? 'star_half' : 'star'}
              </span>
            </div>
            <span className="text-ui-small font-semibold">({product.reviewsCount || 12} Reviews)</span>
            <span className="h-4 w-px bg-border"></span>
            <span className="text-success text-ui-small font-bold uppercase tracking-widest">In Stock</span>
          </div>

          <div className="py-md border-y border-border flex items-baseline gap-md">
            <span className="font-price-hero text-2xl md:text-price-hero text-primary font-bold">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-on-surface-variant line-through text-card-title">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-error-container text-on-error-container px-sm py-xs text-ui-small rounded-lg font-bold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && (
            <div className="flex flex-col gap-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Select Color: <span className="text-on-surface font-bold">{selectedColor}</span>
              </span>
              <div className="flex gap-md">
                {product.colors.map((color) => {
                  const colorMap = {
                    'Glossy White': 'bg-white border-2 border-border',
                    'Bone Ivory': 'bg-[#E0DDD8]',
                    'Matte Charcoal': 'bg-[#313030]',
                    'Matte Black': 'bg-[#1a1a1a]',
                    'Polished Chrome': 'bg-slate-300',
                    'Polished Gold': 'bg-amber-400',
                    'Brushed Steel': 'bg-zinc-300',
                    'Brushed Brass': 'bg-[#C8892A]'
                  };
                  const colorClass = colorMap[color] || 'bg-gray-400';
                  const isSelected = selectedColor === color;

                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-200 ${colorClass} ${
                        isSelected ? 'ring-2 ring-offset-2 ring-primary border-primary' : 'border-2 border-transparent'
                      }`}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="flex flex-col gap-md mt-md">
            <div className="flex items-center gap-lg">
              <span className="font-label-caps text-label-caps text-on-surface-variant font-semibold">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg bg-surface-container-low shadow-sm">
                <button
                  className="px-md py-sm hover:bg-surface-container transition-colors cursor-pointer font-bold text-lg"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  className="w-12 text-center border-none bg-transparent focus:ring-0 font-bold focus:outline-none"
                  id="qty"
                  readOnly
                  type="number"
                  value={quantity}
                />
                <button
                  className="px-md py-sm hover:bg-surface-container transition-colors cursor-pointer font-bold text-lg"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-md mt-sm">
              <button
                onClick={handleAddToCart}
                className="bg-primary text-on-primary py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-sm shadow-md active:scale-95 cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined text-xl">shopping_cart</span> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="border-2 border-primary text-primary py-md font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                Buy Now
              </button>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp-green text-white py-md font-bold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-sm shadow-md active:scale-95 cursor-pointer text-sm"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.29-4.174c1.511.895 3.332 1.371 5.191 1.372h.001c5.452 0 9.891-4.439 9.893-9.891 0-2.641-1.028-5.124-2.897-6.993s-4.354-2.896-6.995-2.896c-5.452 0-9.891 4.438-9.894 9.892 0 1.93.551 3.811 1.595 5.433l-1.042 3.804 3.901-1.021zm11.234-7.052c-.301-.15-1.781-.879-2.057-.979-.275-.1-.475-.15-.675.15s-.776.979-.951 1.179-.35.225-.65.075c-.301-.15-1.267-.467-2.414-1.491-.893-.797-1.495-1.781-1.671-2.081-.175-.3-.018-.462.131-.611.134-.134.301-.35.451-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.626-.926-2.227-.244-.588-.493-.508-.675-.517-.175-.008-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.502s1.075 2.903 1.225 3.103c.15.2 2.115 3.227 5.125 4.525.716.309 1.275.494 1.71.633.72.228 1.374.196 1.891.119.577-.086 1.781-.726 2.031-1.426.25-.7 0-1.275-.075-1.426-.075-.15-.275-.225-.575-.375z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>

          <div className="mt-lg grid grid-cols-2 gap-md bg-surface-container p-md rounded-xl border border-border/30 shadow-sm">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">local_shipping</span>
              <div className="flex flex-col">
                <span className="text-ui-small font-bold text-primary">Fast Delivery</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Ships in 2-3 days</span>
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
              <div className="flex flex-col">
                <span className="text-ui-small font-bold text-primary">10 Year Warranty</span>
                <span className="text-[10px] text-on-surface-variant font-medium">On ceramic glaze</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Tabs Section */}
      <section className="mt-xxxl">
        <div className="flex border-b border-border overflow-x-auto scrollbar-hide gap-lg">
          {[
            { id: 'desc', label: 'Description' },
            { id: 'specs', label: 'Specifications' },
            { id: 'delivery', label: 'Delivery Info' },
            { id: 'reviews', label: `Reviews (${product.reviewsCount || 12})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-lg py-md text-nav-link transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-xl">
          {activeTab === 'desc' && (
            <div className="space-y-md">
              <h3 className="font-headline-section text-headline-section text-primary">
                Uncompromising Comfort and Style
              </h3>
              <p className="max-w-3xl text-on-surface-variant leading-relaxed">
                {product.description ||
                  'Sleek, architectural hardware tailored for modern residential properties. Provides exceptional durability and refined aesthetics.'}
              </p>
              <ul className="list-disc list-inside space-y-sm text-on-surface-variant font-medium text-sm">
                <li>High-efficiency dual flushing system (3L/6L)</li>
                <li>Ergonomic seat profile for maximum daily comfort</li>
                <li>Scratch-resistant, easy-to-clean sanitary surface</li>
                <li>Authorized original product warranty protection</li>
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="overflow-hidden rounded-xl border border-border shadow-sm max-w-3xl">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-border">
                  {Object.entries(product.specs || {}).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-surface-container-low' : 'bg-white'}>
                      <th className="px-lg py-md font-bold text-primary w-1/3 text-sm">{key}</th>
                      <td className="px-lg py-md text-on-surface-variant text-sm font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="bg-surface-container-low p-xl rounded-xl border border-border/30 shadow-sm max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                <div>
                  <h4 className="font-bold text-primary mb-sm text-base">Shipping Information</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                    We deliver across Pakistan. Major cities (Lahore, Karachi, Islamabad) receive orders within 48-72 hours. Other areas may take 4-7 working days.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-sm text-base">Return Policy</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                    14-day hassle-free return policy if the product is in its original packaging and unused. Damaged items during shipping must be reported within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-lg max-w-3xl">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-section text-headline-section text-primary">
                  Customer Feedback
                </h3>
                <button
                  onClick={() => alert('Write review modal coming soon!')}
                  className="bg-primary text-on-primary px-lg py-md rounded-lg font-bold hover:bg-secondary transition-all cursor-pointer text-sm shadow-sm"
                >
                  Write a Review
                </button>
              </div>

              {/* Sample Review */}
              <div className="border-b border-border pb-lg">
                <div className="flex items-center gap-md mb-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    AH
                  </div>
                  <div>
                    <div className="font-bold text-primary">Ahmed Hassan</div>
                    <div className="text-secondary flex text-[14px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                  "The quality is exceptional. It looks much more expensive than it is. The soft-close seat works perfectly and installation was straightforward. Highly recommend Sanitary.pk for their service."
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* You Might Also Like Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-xxxl mb-xl">
          <h2 className="font-headline-section text-headline-section text-primary mb-xl">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/product/${item.slug || 'master-one-piece-commode'}`);
                  setMainImage(item.image);
                  setSelectedColor(item.colors ? item.colors[0] : 'Standard');
                  setQuantity(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white p-sm rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/20 cursor-pointer"
              >
                <div className="aspect-square bg-surface-container rounded-lg overflow-hidden mb-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <span className="text-ui-small text-on-surface-variant font-semibold uppercase text-[10px] tracking-wider block">
                  {item.brand}
                </span>
                <h4 className="font-card-title text-card-title text-primary mt-xs line-clamp-1 group-hover:text-secondary transition-colors duration-200 font-semibold">
                  {item.name}
                </h4>
                <p className="font-price-card text-price-card text-primary mt-sm font-bold">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
