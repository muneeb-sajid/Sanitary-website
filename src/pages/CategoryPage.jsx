import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart, productsList } from '../context/CartContext';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const searchQueries = searchParams.get('search') || '';

  // Filter States
  const [maxPrice, setMaxPrice] = useState(250000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [sortBy, setSortBy] = useState('featured');

  // Breadcrumbs title and description
  const categoryMeta = {
    showers: {
      title: 'Luxury Shower Systems',
      desc: "Transform your daily routine into a spa-like experience. Explore our curated collection of architectural rain showers, precision mixers, and complete shower sets from the world's leading manufacturers."
    },
    commodes: {
      title: 'Commodes & Sanitary Ware',
      desc: 'Discover high-efficiency one-piece commodes, wall-hung toilets, and conceled flushing systems combining premium ceramic finishes with state-of-the-art rimless flush technology.'
    },
    faucets: {
      title: 'Bathroom Fittings & Faucets',
      desc: 'Sleek, tactile brass and polished chrome fittings designed for ultimate reliability. From mixer taps to Muslim showers, explore our premium bathroom brassware.'
    },
    kitchen: {
      title: 'Kitchen Sinks & Faucets',
      desc: 'Equip your culinary space with professional-grade undermount steel sinks and flexible spray taps. Clean aesthetics meeting robust daily functions.'
    },
    accessories: {
      title: 'Bath Accessories & Basins',
      desc: 'Complete your master bath with custom hand-carved stone basins, glass countertops, luxury mirror cabinets, and architectural accessory kits.'
    }
  };

  const meta = categoryMeta[categoryId] || {
    title: 'Premium Collections',
    desc: 'Explore our full range of high-end architectural hardware and bathroom fixtures curated for design excellence.'
  };

  // Reset filters when category changes
  useEffect(() => {
    setMaxPrice(250000);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSortBy('featured');
  }, [categoryId]);

  // Extract unique brands and materials for sidebar filters based on products in this category
  const categoryProducts = productsList.filter(p => !categoryId || p.category === categoryId);
  const availableBrands = [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))];
  
  // Filter logic
  let filteredProducts = categoryProducts.filter((product) => {
    // Search query match
    if (searchQueries && !product.name.toLowerCase().includes(searchQueries.toLowerCase()) && !product.brand.toLowerCase().includes(searchQueries.toLowerCase())) {
      return false;
    }
    // Price match
    if (product.price > maxPrice) return false;
    // Brand match
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    // Material match (if product has materials property)
    if (selectedMaterials.length > 0) {
      if (!product.materials) return false;
      const hasMatch = product.materials.some(m => selectedMaterials.includes(m));
      if (!hasMatch) return false;
    }
    return true;
  });

  // Sorting logic
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts.sort((a, b) => (a.badge === 'NEW' ? -1 : 1));
  }

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleMaterial = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const clearFilters = () => {
    setMaxPrice(250000);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSortBy('featured');
  };

  return (
    <main className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-xs text-ui-small text-on-surface-variant mb-lg font-medium">
        <button onClick={() => navigate('/')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface font-semibold capitalize">{categoryId || 'All'}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-xxl flex flex-col md:flex-row md:items-end justify-between gap-lg border-b border-border/40 pb-xl">
        <div className="max-w-2xl">
          <h1 className="font-display-hero text-3xl md:text-5xl lg:text-display-hero text-primary mb-sm leading-tight">
            {meta.title}
          </h1>
          <p className="text-body-main text-text-secondary leading-relaxed">
            {meta.desc}
          </p>
        </div>
        <div className="flex items-center gap-md justify-between md:justify-end w-full md:w-auto">
          <span className="font-label-caps text-label-caps text-on-surface-variant font-semibold">
            {filteredProducts.length} Products
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-border rounded-lg px-md pr-xl py-2 text-ui-small font-semibold focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-xxl">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-xl bg-white p-lg rounded-xl shadow-sm border border-border/30">
            {/* Price Filter */}
            <section>
              <h3 className="font-label-caps text-label-caps text-primary mb-md font-bold uppercase tracking-wider">
                Price Range
              </h3>
              <div className="space-y-sm">
                <input
                  className="w-full accent-primary h-1 bg-surface-container-highest rounded-full cursor-pointer"
                  max="250000"
                  min="4000"
                  step="1000"
                  type="range"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
                <div className="flex justify-between items-center text-ui-small font-semibold text-on-surface-variant">
                  <span>PKR 4,000</span>
                  <span>PKR {maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <section>
                <h3 className="font-label-caps text-label-caps text-primary mb-md font-bold uppercase tracking-wider">
                  Brand
                </h3>
                <div className="space-y-sm">
                  {availableBrands.map((brand) => {
                    const isChecked = selectedBrands.includes(brand);
                    return (
                      <label key={brand} className="flex items-center gap-sm group cursor-pointer">
                        <div
                          onClick={() => toggleBrand(brand)}
                          className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'
                          }`}
                        >
                          {isChecked && (
                            <span className="material-symbols-outlined text-[16px] text-white font-bold">check</span>
                          )}
                        </div>
                        <span className={`text-body-main text-sm text-on-surface-variant group-hover:text-on-surface ${isChecked ? 'font-semibold text-primary' : ''}`}>
                          {brand}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Material Filter */}
            <section>
              <h3 className="font-label-caps text-label-caps text-primary mb-md font-bold uppercase tracking-wider">
                Material / Finish
              </h3>
              <div className="space-y-sm">
                {['Polished Chrome', 'Brushed Nickel', 'Matte Black', 'Polished Gold', 'Ceramic'].map((mat) => {
                  const isChecked = selectedMaterials.includes(mat);
                  return (
                    <label key={mat} className="flex items-center gap-sm group cursor-pointer">
                      <div
                        onClick={() => toggleMaterial(mat)}
                        className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'
                        }`}
                      >
                        {isChecked && (
                          <span className="material-symbols-outlined text-[16px] text-white font-bold">check</span>
                        )}
                      </div>
                      <span className={`text-body-main text-sm text-on-surface-variant group-hover:text-on-surface ${isChecked ? 'font-semibold text-primary' : ''}`}>
                        {mat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Reset Button */}
            <button
              onClick={clearFilters}
              className="w-full py-sm border border-border text-ui-small font-bold rounded-lg hover:bg-surface-container-low hover:border-primary transition-all duration-200 uppercase tracking-widest cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-xxxl bg-white rounded-xl border border-border/30 shadow-sm">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-md opacity-40">
                search_off
              </span>
              <h3 className="font-headline-section text-xl text-primary font-bold">No Products Found</h3>
              <p className="text-on-surface-variant text-sm mt-xs">
                Try adjusting your filters or clearing them to browse all premium options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-xl">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="product-card bg-white rounded-xl overflow-hidden border border-border/40 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                        src={prod.image}
                        alt={prod.name}
                        onClick={() => navigate(`/product/${prod.slug || 'master-one-piece-commode'}`)}
                      />
                      {prod.badge && (
                        <span className="absolute top-4 left-4 bg-secondary text-white font-label-caps text-[10px] px-md py-xs rounded-full shadow-sm font-semibold">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-lg">
                      <div className="flex justify-between items-start mb-xs">
                        <span className="font-label-caps text-label-caps text-secondary font-semibold">{prod.brand}</span>
                      </div>
                      <h3
                        onClick={() => navigate(`/product/${prod.slug || 'master-one-piece-commode'}`)}
                        className="font-card-title text-card-title text-primary mb-md line-clamp-2 cursor-pointer hover:text-secondary transition-colors duration-200 font-semibold"
                      >
                        {prod.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-lg pt-0 flex items-center justify-between mt-auto">
                    <span className="font-price-card text-price-card text-primary font-bold">
                      Rs. {prod.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(prod, 1);
                        alert(`${prod.name} added to cart!`);
                      }}
                      className="p-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 cursor-pointer shadow-md"
                      title="Add to Cart"
                    >
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-xxl flex justify-center items-center gap-sm">
              <button className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-surface-container-low hover:border-primary transition-colors cursor-pointer text-on-surface">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg font-bold">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-surface-container-low hover:border-primary transition-colors font-semibold cursor-pointer text-on-surface">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-surface-container-low hover:border-primary transition-colors font-semibold cursor-pointer text-on-surface">
                3
              </button>
              <span className="px-sm text-on-surface-variant">...</span>
              <button className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-surface-container-low hover:border-primary transition-colors font-semibold cursor-pointer text-on-surface">
                8
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-surface-container-low hover:border-primary transition-colors cursor-pointer text-on-surface">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
