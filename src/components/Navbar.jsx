import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }

  .desktop-nav {
    gap: 24px;
    align-items: center;
  }

  .mobile-menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #43474e;
    align-items: center;
    justify-content: center;
    display: none;
  }

  .mobile-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 48;
    animation: fadeIn 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-nav-panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fcf9f8;
    border-top: 1px solid #E0DDD8;
    box-shadow: 0 8px 16px rgba(0,0,0,0.08);
    z-index: 49;
    animation: slideDown 0.3s ease forwards;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }

  .mobile-nav-link {
    display: block;
    padding: 16px 24px;
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
  }

  .mobile-nav-link:hover {
    background: rgba(0, 38, 69, 0.05);
  }

  @media (max-width: 1024px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-btn {
      display: inline-flex;
    }
  }

  @media (max-width: 640px) {
    header > div {
      padding: 0 16px;
    }

    .mobile-nav-link {
      padding: 14px 16px;
    }
  }
`;

const navLinks = [
  { name: "Faucets", to: "/category/faucets" },
  { name: "Showers", to: "/category/showers" },
  { name: "Toilets", to: "/category/commodes" },
  { name: "Kitchen", to: "/category/kitchen" },
  { name: "Accessories", to: "/category/accessories" },
  { name: "Brands", to: "/brands" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Faucets");
  const { getCartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const current = navLinks.find((link) => location.pathname.startsWith(link.to));
    setActiveLink(current?.name ?? "Faucets");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <header
        style={{
          background: "#fcf9f8",
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: scrolled ? 64 : 80,
          transition: "height 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#002645",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            Sanitary.pk
          </Link>

          <nav className="desktop-nav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setActiveLink(item.name)}
                style={{
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  color: activeLink === item.name ? "#002645" : "#43474e",
                  borderBottom: activeLink === item.name ? "2px solid #002645" : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              to="/login"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                color: "#43474e",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined">person</span>
            </Link>

            <Link
              to="/cart"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                color: "#43474e",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {getCartCount() > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "#845400",
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "Inter",
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="mobile-menu-btn"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div
              className="mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="mobile-nav-panel">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => {
                    setActiveLink(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className="mobile-nav-link"
                  style={{
                    color: activeLink === item.name ? "#002645" : "#43474e",
                    borderLeft: activeLink === item.name ? "3px solid #845400" : "3px solid transparent",
                    fontWeight: activeLink === item.name ? 600 : 500,
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </header>
    </>
  );
}
