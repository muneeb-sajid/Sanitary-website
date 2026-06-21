import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Faucets', path: '/category/faucets' },
    { name: 'Showers', path: '/category/showers' },
    { name: 'Toilets', path: '/category/commodes' },
    { name: 'Kitchen', path: '/category/kitchen' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Brands', path: '/brands' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-main text-on-surface">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'h-16 bg-surface/95 backdrop-blur-md shadow-md dark:bg-inverse-surface/95'
            : 'h-20 bg-surface dark:bg-inverse-surface'
        } flex items-center border-b border-border/30`}
      >
        <div className="flex justify-between items-center w-full px-gutter-mobile md:px-gutter-desktop max-w-max-width mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="font-display-hero text-display-hero-mobile md:text-2xl lg:text-[32px] text-primary dark:text-primary-fixed-dim uppercase tracking-tight"
          >
            Sanitary.pk
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-md lg:space-x-lg">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-nav-link text-nav-link pb-1 transition-all duration-200 ${
                    isActive
                      ? 'text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-sm md:space-x-md">
            {/* Search Input (Hidden on mobile) */}
            <div className="relative hidden lg:block">
              <input
                className="bg-surface-container-low border border-border/50 rounded-lg px-md py-1.5 text-ui-small w-60 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300"
                placeholder="Search premium hardware..."
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/category/showers?search=${e.target.value}`);
                  }
                }}
              />
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
                search
              </span>
            </div>

            {/* Profile */}
            <button
              onClick={() => navigate('/login')}
              className="p-2 text-on-surface-variant hover:text-primary transition-all duration-300"
              title="Profile / Account"
            >
              <span className="material-symbols-outlined text-[24px]">person</span>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigate('/cart')}
              className="p-2 text-on-surface-variant hover:text-primary transition-all duration-300 relative"
              title="Shopping Cart"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] rounded-full w-4.5 h-4.5 flex items-center justify-center font-bold animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Burger Menu Button (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-surface shadow-2xl p-lg flex flex-col space-y-lg transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b border-border pb-md mt-md">
            <span className="font-bold text-primary">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {/* Mobile Search */}
          <div className="relative">
            <input
              className="bg-surface-container-low border border-border/50 rounded-lg px-md py-sm text-ui-small w-full focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Search..."
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMobileMenuOpen(false);
                  navigate(`/category/showers?search=${e.target.value}`);
                }
              }}
            />
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
          </div>

          <nav className="flex flex-col space-y-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium py-sm border-b border-border/10 ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Spacer */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/924211172675?text=Hello,%20I'm%20interested%20in%20purchasing%20premium%20sanitary%20hardware%20from%20Sanitary.pk"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-lg right-lg z-50 bg-whatsapp-green text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95 cursor-pointer"
        title="Chat with an Expert"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.436 2.511 1.233 3.487l-.805 2.94 3.012-.79c.924.507 1.977.777 3.067.777h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.336 8.3c-.145.412-.733.753-1.011.801-.277.049-.623.088-1.428-.232-.401-.158-.877-.348-1.558-.646-2.73-1.196-4.504-4.103-4.641-4.282-.136-.179-1.112-1.479-1.112-2.82 0-1.341.699-2.002.949-2.274.25-.272.544-.34.726-.34.181 0 .363.001.52.009.167.008.388-.063.607.469.227.546.776 1.895.844 2.031.069.136.114.294.023.476-.091.182-.136.295-.273.454-.136.159-.284.354-.407.476-.136.136-.28.286-.12.559.16.273.71 1.171 1.523 1.893.931.829 1.716 1.084 2.058 1.244.341.159.545.136.75-.114.205-.25.864-.999 1.092-1.34.227-.341.455-.284.773-.17.318.114 2.023 1.011 2.37 1.185.347.173.578.259.664.406.086.147.086.853-.06 1.265zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-footer-dark dark:bg-surface-container-lowest text-on-primary mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg px-gutter-mobile md:px-gutter-desktop py-xxl w-full max-w-max-width mx-auto">
          <div className="space-y-md">
            <Link to="/" className="font-display-hero text-display-hero-mobile text-on-primary dark:text-primary uppercase mb-md block">
              Sanitary.pk
            </Link>
            <p className="font-ui-small text-on-tertiary-container dark:text-on-surface-variant">
              Your trusted partner for high-end architectural hardware and sanitary ware since 1998. Quality that defines your space.
            </p>
            <div className="flex space-x-md">
              <a className="w-10 h-10 border border-on-tertiary-container/30 flex items-center justify-center rounded hover:border-secondary-fixed hover:text-secondary-fixed transition-all" href="#">
                <span className="material-symbols-outlined text-sm">face_nod</span>
              </a>
              <a className="w-10 h-10 border border-on-tertiary-container/30 flex items-center justify-center rounded hover:border-secondary-fixed hover:text-secondary-fixed transition-all" href="#">
                <span className="material-symbols-outlined text-sm">camera</span>
              </a>
              <a className="w-10 h-10 border border-on-tertiary-container/30 flex items-center justify-center rounded hover:border-secondary-fixed hover:text-secondary-fixed transition-all" href="#">
                <span className="material-symbols-outlined text-sm">linked_camera</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-card-title text-card-title mb-lg text-white font-semibold">Quick Links</h4>
            <ul className="space-y-md text-ui-small">
              <li><Link className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" to="/category/showers">Shower Systems</Link></li>
              <li><Link className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" to="/category/commodes">Commodes & Toilets</Link></li>
              <li><Link className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" to="/brands">Our Brands</Link></li>
              <li><Link className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" to="/login">Account Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 class="font-card-title text-card-title mb-lg text-white font-semibold">Customer Care</h4>
            <ul className="space-y-md text-ui-small">
              <li><a className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" href="#">Returns & Exchanges</a></li>
              <li><a className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" href="#">FAQs</a></li>
              <li><a className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" href="#">Track Order</a></li>
              <li><a className="text-on-tertiary-container dark:text-on-surface-variant hover:text-secondary-fixed-dim transition-all" href="#">Wholesale Inquiry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-card-title text-card-title mb-lg text-white font-semibold">Store Location</h4>
            <p className="font-ui-small text-on-tertiary-container dark:text-on-surface-variant mb-md">
              Plot 123-B, Main Ferozepur Road,<br />Lahore, Pakistan.
            </p>
            <p className="font-ui-small text-on-tertiary-container dark:text-on-surface-variant">
              Phone: +92 (42) 111-SAN-PK<br />Email: sales@sanitary.pk
            </p>
            <div className="mt-lg rounded-lg overflow-hidden h-32 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdIBhbrvcfH0-0uhN7QTBblxq7CKLtTgYWnKkf00KUwVpsRp_uEVWek59e7Eec7Hv3vFfv-bklOGzodwdnhrqJ9orWeZhpdG0dPsVIeVkDVxnRP2FeqvSkK60ZE_fKNopSTfvOgkXp1pjEtJWG2KeLgkJ12DV-rduLacnoB7-9a92m6DNDHeVhkRYlPrAG0lzwx-CCiOGMAPruFzwrmMDO_yd_7iXgtSWZkO2npsu8mrgjqH5xyZEiuYnebqJO5HdO4Z4sw0Cx27k')"
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 py-lg text-center">
          <p className="font-ui-small text-on-tertiary-container/50 text-[10px]">
            © 2024 Sanitary.pk. All rights reserved. Premium Architectural Hardware.
          </p>
        </div>
      </footer>
    </div>
  );
}
