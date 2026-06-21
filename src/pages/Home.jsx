import { useState } from "react";
import { Link } from "react-router-dom";

const colors = {
  primary: "#002645",
  secondary: "#845400",
  secondaryContainer: "#fcb654",
  onSecondary: "#ffffff",
  onPrimary: "#ffffff",
  surface: "#fcf9f8",
  surfaceContainerLow: "#f6f3f2",
  surfaceVariant: "#e5e2e1",
  onSurface: "#1c1b1b",
  onSurfaceVariant: "#43474e",
  footerDark: "#111827",
  whatsappGreen: "#25D366",
  border: "#E0DDD8",
  onTertiaryContainer: "#a5a4a1",
  secondaryFixed: "#ffddb5",
  secondaryFixedDim: "#ffb958",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #fcf9f8; color: #1c1b1b; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .fill-icon { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

  .scrolling-strip { animation: scroll 30s linear infinite; display: flex; white-space: nowrap; }
  @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); }

  .category-gradient { background: linear-gradient(to top, rgba(0,38,69,0.8) 0%, rgba(0,38,69,0) 60%); }

  .category-card img, .category-card .bg-img { transition: transform 0.7s ease; }
  .category-card:hover img, .category-card:hover .bg-img { transform: scale(1.1); }

  .explore-text { opacity: 0; transition: opacity 0.3s ease; }
  .category-card:hover .explore-text { opacity: 1; }

  .trust-badge:hover .icon-wrap { transform: translateY(-4px); }
  .icon-wrap { transition: transform 0.3s ease; }

  .product-img { transition: transform 0.4s ease; }
  .product-card:hover .product-img { transform: scale(1.05); }
`;

const products = [
  {
    brand: "GROHE", name: "Essence New Basin Mixer Gold", price: "PKR 45,500", badge: "NEW",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOkak54yDgr1hvODZOXzKbUFWYGmJtIefwnFFmBxBr41z7r1OoVlU1cgV2OyZZ3wxC7Q-RsKbfGgBlO51sFV_psFWoEGhuHZhgjdjXn9cC5PPr0j-WZ89Otc6-CQfkmZuMzB9sk8Bl27bvbxcYpJCxVAQHXdcyPClEirqTwPERyF7ntqXnMcpv7u-fHmFf8dXE3UFBjJPbSAakctUzb9wicq3hbZePe5j_fDnquRxs-1uOkLfrkHFKZ4iXkNOx3n4kPBZ78Lu8ADo"
  },
  {
    brand: "TOTO", name: "Wall-Hung Rimless Matte Black", price: "PKR 82,000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJkUisx1h48nU8EnTqEjN8yQDfXbUbte880np3voLpylz3rmVWI2YPxA0mcUCrS92rbGyWSiR5unvQPZnkCDWAf9tyoQ2Hjr2g6j3lkJF4d7jleQ7PxJxa4U_kqy1EtTPxCyC03NTKrgB5Pn_3WjwQG0EZEl1tepYwFPT4HHJwIMldl4ZEIrqZA4gd3ZdhcCtK9R7oJ2PJewc0jOZy2Csm0YFbbnmnLsRbWgi_EEnfSnE7CW8zUa3xOCLkRsH2UXIu59xJGTf0Jck"
  },
  {
    brand: "KOHLER", name: "Malleco Pull-Down Kitchen Faucet", price: "PKR 38,900",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL4ybq-_-KL-NJn1xfQNOtFCoW31D8EklHJY2LMvwsYK_j0c6Lkjd7BQcPTwTR6f4T7SBlcvE7pNphpACvUh9MmHumrnFyFVPNjZTa5HU8_9pTORZ2zEcU7hBxcuN6czbHVkQDO0GSqqAD68Xd_plJvh2dTXtCl9o8LAgw9FlCWhblgdR7yYYg9EGdcGKinvRHuP_iJBQsXRhYo6JTWSScESV-N_C4jb6BMvuKR4Pt2p0JMcCOmi8W_K8vO5uphIEiOm3-6GYwOkU"
  },
  {
    brand: "ROCA", name: "L90 Thermostatic Shower System", price: "PKR 115,000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHY4B2yAEK_BjWrDJiD9JF7hZeUMClxNlvQ6SfYcUhA6-zV71akxUR6AoyRiPM2-kh_fa58CXfTCk6fpUFOmc4B2BIkPc7WZFsBt8jL4lgF1VnZ8D0qdana_iEBXx6FMv4o0-X4jCJcxSWoR7ufR0jIJSQeFxXLhE9RJZWpDld6oiaOXsSq11y-98VkCURrmfNultn4uwTJiyLEmX4jpd7bDF19RN3Au0Jyg9zuhchx_dNQtsleM8idXbyhTYz3tUUaUGxAJDs-TM"
  },
];

const categories = [
  {
    name: "Commodes", count: "120+ Models",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJGA6Z5B2Q5Qr_iy25zuf9ZdO6K0AkKcMl-W09ZOyzIavxegmZsz7lSG4iSzAcfBQ3jKzT4mNLhovH-3HmG3iVEzOLgbdFQM38TRXJ2VrRWe_RIIhEeTPxDGXnVt7JfuNvVgLykk9Ru3m2L1BLzn4ddb95aWXWIvu4bRG__VUEJnn-uDoW9uSw-neypTuf3D5PrL8tfSQu8s8TDgBdMtJuUGAJN42R2VTdAAwx4MMDy3R_dQugWakNwjEa1RXRyl7wVNxip3LAq8U",
    path: "/category/commodes"
  },
  {
    name: "Wash Basins", count: "85+ Designs",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcUd4-0ZUIn_OqDKS2_Vot2HedulxVuw5I7QpL4NVirFACG5My30p5trUWp7mBqScxOoQHy-7IivqquDNOdtn1BARNw09cx97BS6YCLOe1CmlRN1FVzseVJuolV6fDULaG7-iVEO7efn_6PnG8zfto5mU-0VeeMvdCbX-7lgqDzom_TKxdfdfk9KFO2eeV7MWVt3Nga9od4SYzmI_qbiIwiT4OPgzs_lNT4b_g50vpA4vbJ6pUuRyS3CefgQVztmV4F1DNf5GEHGI",
    path: "/category/accessories"
  },
  {
    name: "Showers", count: "200+ Kits",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqUinPsgmkjJqnQT9I0WzufU11EQLHmSoEuWet2xDDySIljLkc4xZmqoZOn_UYt0G7iNqgdFmCNG8OC_z2bD74Txk3-s6RJMVdznNBOt49PzO7HGt7WZua-BUP5HQ9FSqx2ERybAPYuL7j3EEm3PPkE1BigF0ZjRIZOl6mxDoovFyffWszUBTHqb8KsdTifNQq7lZxE1zGu4als9boKIqbJ1pKKzqnPAAxpBXcQJRTlFYeAdZEmM5pwnhnNI8hhc5b2Us_NFCizQ",
    path: "/category/showers"
  },
  {
    name: "Kitchen Sinks", count: "60+ Options",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY-q41CO7mkqXT-Ps7ri8lDLqCDF2rpgSimu32vl562342oLrSBaFhoqbJdXBSKqwjJZtjKjNQSdAeiqOIUJm3lCzimgYT0uZAYjjxnaFuypAsz2mbZN0fd11U8d4OPpqEYS-53zszAraMhNCGiq45T9StQkIPz-tngc_xie7PULScpQ9-ALa3wB-h4_LiUaszOmCriuUnOa2qFhNuIdFk52-fQT1ZE2X9iqZ-dEtLelftDLHmJf7vp-2yTZ08NHrqlMVX85y5FGs",
    path: "/category/kitchen"
  },
];

const brands = ["GROHE", "TOTO", "KOHLER", "ROCA"];

const reviews = [
  {
    initials: "SA",
    name: "Sadia Arshad",
    role: "Interior Designer",
    text: "Sanitary.pk delivered premium fixtures quickly and helped us finish our showroom project on schedule."
  },
  {
    initials: "NM",
    name: "Naveed Malik",
    role: "Luxury Villa Owner",
    text: "The quality and service were outstanding — every product arrived exactly as promised with expert guidance."
  },
  {
    initials: "TZ",
    name: "Tanzeel Zafar",
    role: "Hospitality Consultant",
    text: "Their team made specifying high-end sanitaryware easy, with dependable stock and fast support throughout the build."
  },
];

export default function SanitaryPK() {
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState("");

  const addToCart = () => setCartCount(c => c + 1);

  return (
    <>
      <style>{styles}</style>

      {/* Hero */}
      <section style={{ position: "relative", width: "100%", height: 700, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDK4VLcqS9A2mNaC80lx1CevbsKB-WSwgIWXXEhY83FMMsv-2fr7mcDqB8tI3zSJbTmtYEI7l4AujUCpZovnDycW4wyQNotjWM7mL5Z6-DqaiTzCVAUAO9tdxEFyJ0AKFKPqiH_FGP_KXlJ1zQMbIar5AFXKmZPBLimQtkP8sdmsbhvkvy_gImY62NHL7K5kyt8GZ4I_cQHDrlUf-WIpMxKjb3FM8pAxSocMlM9qrC9XSuedc6ZvyMb_Wl8ku0xSkxPO_ZnBpIJbk4')",
          backgroundSize: "cover", backgroundPosition: "center"
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,38,69,0.45)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ maxWidth: 600 }}>
            <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", display: "block", marginBottom: 16 }}>
              Excellence in Hardware
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
              Elevate Every Bathroom &amp; Kitchen
            </h1>
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "rgba(255,255,255,0.9)", marginBottom: 40, maxWidth: 500, lineHeight: 1.7 }}>
              Discover our curated collection of architectural sanitary ware. From timeless brass faucets to contemporary minimalist toilets, we define the luxury standard for Pakistani homes.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link to="/category/faucets" style={{ background: colors.primary, color: "#fff", padding: "14px 40px", border: "none", borderRadius: 4, fontFamily: "Inter", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = colors.secondary}
                onMouseLeave={e => e.currentTarget.style.background = colors.primary}>
                Shop Collection
              </Link>
              <Link to="/brands" style={{ background: "transparent", color: "#fff", padding: "14px 40px", border: "2px solid #fff", borderRadius: 4, fontFamily: "Inter", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = colors.primary; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}>
                Explore Brands
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ background: "#f6f3f2", padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { icon: "local_shipping", title: "Free Delivery", desc: "On orders over PKR 25,000" },
              { icon: "verified", title: "100% Genuine", desc: "Authorized brand partners" },
              { icon: "assignment_return", title: "Easy Returns", desc: "7-day hassle-free policy" },
              { icon: "support_agent", title: "Expert Support", desc: "Architectural guidance available" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="trust-badge" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: 16 }}>
                <div className="icon-wrap" style={{ width: 64, height: 64, background: "#fff", borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span className="material-symbols-outlined" style={{ color: colors.secondary, fontSize: 28 }}>{icon}</span>
                </div>
                <h3 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{title}</h3>
                <p style={{ fontFamily: "Inter", fontSize: 12, color: colors.onSurfaceVariant }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "64px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: colors.primary }}>Browse Categories</h2>
              <div style={{ height: 4, width: 80, background: colors.secondary, marginTop: 8 }} />
            </div>
            <Link to="/category/faucets" style={{ fontFamily: "Inter", fontSize: 14, color: colors.primary, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontWeight: 500 }}>
              View All Categories <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {categories.map(({ name, count, img, path }) => (
              <Link key={name} to={path} className="category-card" style={{ position: "relative", height: 320, borderRadius: 12, overflow: "hidden", display: "block", textDecoration: "none" }}>
                <img src={img} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="category-gradient" style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: 24, width: "100%" }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff" }}>{name}</h4>
                  <p className="explore-text" style={{ fontFamily: "Inter", fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>Explore {count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ background: "rgba(229,226,225,0.3)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: colors.primary, textAlign: "center", marginBottom: 64 }}>New Arrivals</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {products.map(({ brand, name, price, badge, img }) => (
              <div key={name} className="product-card" style={{ background: "#fff", borderRadius: 8, padding: 8, position: "relative" }}>
                {badge && (
                  <span style={{ position: "absolute", top: 16, left: 16, zIndex: 1, background: colors.secondary, color: "#fff", fontFamily: "Inter", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 99, textTransform: "uppercase" }}>
                    {badge}
                  </span>
                )}
                <div style={{ aspectRatio: "4/3", background: colors.surface, overflow: "hidden", borderRadius: 4, marginBottom: 16 }}>
                  <img className="product-img" src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "0 4px 16px" }}>
                  <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.onSurfaceVariant, marginBottom: 4 }}>{brand}</p>
                  <h4 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, marginBottom: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 700, color: colors.primary }}>{price}</span>
                    <button onClick={addToCart} style={{
                      background: colors.primary, color: "#fff", width: 40, height: 40, borderRadius: "50%",
                      border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s"
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = colors.secondary}
                      onMouseLeave={e => e.currentTarget.style.background = colors.primary}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 64 }}>
            <button style={{ border: `2px solid ${colors.primary}`, color: colors.primary, padding: "14px 64px", background: "transparent", borderRadius: 4, fontFamily: "Inter", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = colors.primary; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = colors.primary; }}>
              Browse All New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* Brand Scrolling Strip */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, background: "#fff", overflow: "hidden" }}>
        <div className="scrolling-strip">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: colors.primary, opacity: 0.4, textTransform: "uppercase", letterSpacing: "-0.02em", marginRight: 96, flexShrink: 0 }}>
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 400px", position: "relative" }}>
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", aspectRatio: "1/1" }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY6x7-QgkzTNR4WYM6qFjpkHKx9Htvh1d562lsj4LMuRbcTiDv_TPAQFJd9gw-Vm0JPkP6zRgjpzU9rykoBYmflAiVszZSBTTjx_a31AbyItXm46zO6-S0UXIodE1gsWhGPHfXYlP-_r5v062azaz3Qzpq31KiU2lqUTVOVHGlAMoKiz_iJZrIEPkX9_d05TlNlq0u3d8Zw5oA5ooe_PW5-5QasUc9E7d6Ui1igu8uSsZ2MGKaNbFZ1v1UEAc4aQ_H2s4wte22vVo"
                  alt="Showroom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: -32, right: -32, background: colors.secondary, padding: 24, borderRadius: 12, color: "#fff" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, display: "block" }}>25+</span>
                <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Years of Excellence</span>
              </div>
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: colors.primary, marginBottom: 24 }}>Why Choose Sanitary.pk?</h2>
              <p style={{ color: colors.onSurfaceVariant, marginBottom: 40, lineHeight: 1.7 }}>
                We are more than just a retailer; we are your partners in creating the perfect home environment. With over two decades of experience, we curate only the finest architectural hardware.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { icon: "workspace_premium", title: "Curated Premium Brands", desc: "We partner with global leaders like Grohe and Kohler to bring international quality to your doorstep." },
                  { icon: "architecture", title: "Technical Consultation", desc: "Unsure about plumbing requirements? Our in-house experts provide free technical advice for your projects." },
                  { icon: "inventory_2", title: "Largest Ready Stock", desc: "With 50,000+ sq. ft. of warehousing, we ensure immediate availability for almost all our listed products." },
                ].map(({ icon, title, desc }) => (
                  <li key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span className="material-symbols-outlined" style={{ color: colors.secondary, background: "rgba(132,84,0,0.1)", padding: 8, borderRadius: 4, flexShrink: 0 }}>{icon}</span>
                    <div>
                      <h4 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{title}</h4>
                      <p style={{ fontFamily: "Inter", fontSize: 12, color: colors.onSurfaceVariant, lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ background: colors.primary, padding: "64px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 64 }}>Words from our Patrons</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {reviews.map(({ initials, name, role, text }) => (
              <div key={name} style={{ background: "rgba(255,255,255,0.1)", padding: 40, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-icon" style={{ color: colors.secondaryFixedDim, fontSize: 20 }}>star</span>
                  ))}
                </div>
                <p style={{ fontFamily: "Inter", fontSize: 15, lineHeight: 1.6, fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginBottom: 40 }}>{text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initials}</div>
                  <div>
                    <h5 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, color: "#fff" }}>{name}</h5>
                    <p style={{ fontFamily: "Inter", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: colors.secondary, padding: "64px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", zIndex: 1 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#fff" }}>Join Our Design Circle</h2>
            <p style={{ fontFamily: "Inter", fontSize: 15, color: "rgba(255,255,255,0.9)", marginTop: 8 }}>Get early access to sales, product launches, and luxury bathroom inspiration.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
              style={{ padding: "14px 24px", borderRadius: 4, border: "none", fontFamily: "Inter", fontSize: 14, width: 280, color: colors.primary, outline: "none" }} />
            <button style={{ background: colors.primary, color: "#fff", padding: "14px 24px", border: "none", borderRadius: 4, fontFamily: "Inter", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}>
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href="#" style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 50, background: colors.whatsappGreen,
        color: "#fff", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)", textDecoration: "none", transition: "transform 0.2s"
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.436 2.511 1.233 3.487l-.805 2.94 3.012-.79c.924.507 1.977.777 3.067.777h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.336 8.3c-.145.412-.733.753-1.011.801-.277.049-.623.088-1.428-.232-.401-.158-.877-.348-1.558-.646-2.73-1.196-4.504-4.103-4.641-4.282-.136-.179-1.112-1.479-1.112-2.82 0-1.341.699-2.002.949-2.274.25-.272.544-.34.726-.34.181 0 .363.001.52.009.167.008.388-.063.607.469.227.546.776 1.895.844 2.031.069.136.114.294.023.476-.091.182-.136.295-.273.454-.136.159-.284.354-.407.476-.136.136-.28.286-.12.559.16.273.71 1.171 1.523 1.893.931.829 1.716 1.084 2.058 1.244.341.159.545.136.75-.114.205-.25.864-.999 1.092-1.34.227-.341.455-.284.773-.17.318.114 2.023 1.011 2.37 1.185.347.173.578.259.664.406.086.147.086.853-.06 1.265zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
        </svg>
      </a>

      {/* Footer */}
      <footer style={{ background: colors.footerDark, color: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
          <div>
            <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff", textDecoration: "none", textTransform: "uppercase", display: "block", marginBottom: 16 }}>Sanitary.pk</a>
            <p style={{ fontFamily: "Inter", fontSize: 12, color: colors.onTertiaryContainer, lineHeight: 1.7, marginBottom: 24 }}>Your trusted partner for high-end architectural hardware and sanitary ware since 1998.</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["face_nod", "camera", "linked_camera"].map(icon => (
                <a key={icon} href="#" style={{ width: 40, height: 40, border: "1px solid rgba(165,164,161,0.3)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, color: colors.onTertiaryContainer, textDecoration: "none", transition: "border-color 0.2s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 24 }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {["About Us", "Contact Us", "Privacy Policy", "Shipping Info"].map(link => (
                <li key={link}><a href="#" style={{ fontFamily: "Inter", fontSize: 12, color: colors.onTertiaryContainer, textDecoration: "none", transition: "color 0.2s" }}>{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 24 }}>Customer Care</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {["Returns & Exchanges", "FAQs", "Track Order", "Wholesale Inquiry"].map(link => (
                <li key={link}><a href="#" style={{ fontFamily: "Inter", fontSize: 12, color: colors.onTertiaryContainer, textDecoration: "none" }}>{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 24 }}>Store Location</h4>
            <p style={{ fontFamily: "Inter", fontSize: 12, color: colors.onTertiaryContainer, lineHeight: 1.7, marginBottom: 16 }}>Plot 123-B, Main Ferozepur Road,<br />Lahore, Pakistan.</p>
            <p style={{ fontFamily: "Inter", fontSize: 12, color: colors.onTertiaryContainer, lineHeight: 1.7 }}>Phone: +92 (42) 111-SAN-PK<br />Email: sales@sanitary.pk</p>
            <div style={{ marginTop: 24, borderRadius: 8, overflow: "hidden", height: 128, opacity: 0.7 }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdIBhbrvcfH0-0uhN7QTBblxq7CKLtTgYWnKkf00KUwVpsRp_uEVWek59e7Eec7Hv3vFfv-bklOGzodwdnhrqJ9orWeZhpdG0dPsVIeVkDVxnRP2FeqvSkK60ZE_fKNopSTfvOgkXp1pjEtJWG2KeLgkJ12DV-rduLacnoB7-9a92m6DNDHeVhkRYlPrAG0lzwx-CCiOGMAPruFzwrmMDO_yd_7iXgtSWZkO2npsu8mrgjqH5xyZEiuYnebqJO5HdO4Z4sw0Cx27k"
                alt="Store location" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px", textAlign: "center" }}>
          <p style={{ fontFamily: "Inter", fontSize: 10, color: "rgba(165,164,161,0.5)" }}>© 2024 Sanitary.pk. All rights reserved. Premium Architectural Hardware.</p>
        </div>
      </footer>
    </>
  );
}

