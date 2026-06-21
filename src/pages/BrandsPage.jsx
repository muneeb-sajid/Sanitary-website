import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrandsPage() {
  const navigate = useNavigate();

  const brands = [
    {
      name: 'GROHE',
      origin: 'Germany',
      desc: 'Global leader in premium sanitary fittings. Renowned for engineering excellence, durable finishes, and water-saving technologies.',
      featured: 'Essence New Basin Mixer Gold'
    },
    {
      name: 'TOTO',
      origin: 'Japan',
      desc: 'Pioneers of high-tech sanitary ware. Famous for rimless flushing systems, tornado flushes, and durable vitreous china finishes.',
      featured: 'Wall-Hung Rimless Matte Black Commode'
    },
    {
      name: 'KOHLER',
      origin: 'United States',
      desc: 'Design excellence meeting robust kitchen and bath plumbing. High-arc flexible spouts, professional spray options, and premium textures.',
      featured: 'Malleco Pull-Down Kitchen Faucet'
    },
    {
      name: 'ROCA',
      origin: 'Spain',
      desc: 'Global design brand offering complete bathroom solutions. Sleek European aesthetics, thermostatic controls, and premium shower kits.',
      featured: 'L90 Thermostatic Shower System'
    },
    {
      name: 'PORTA',
      origin: 'International',
      desc: 'Popular brand known for reliable concealed flush mixers, bathroom bidets, and contemporary sanitary fittings at great value.',
      featured: 'Concealed Minimalist Mixer'
    },
    {
      name: 'FAISAL',
      origin: 'Pakistan',
      desc: 'A trusted local pioneer in sanitary fittings, producing durable, high-quality mixers and faucets matching international standards.',
      featured: 'Faisal Premium Basin Mixer'
    }
  ];

  return (
    <main className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-xs text-ui-small font-ui-small text-on-surface-variant mb-lg font-medium">
        <button onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Home</button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface font-semibold">Our Brands</span>
      </nav>

      <div className="mb-xxl border-b border-border/40 pb-xl max-w-2xl">
        <h1 className="font-display-hero text-3xl md:text-5xl lg:text-display-hero text-primary mb-sm leading-tight">
          Authorized Brand Partners
        </h1>
        <p className="text-body-main text-text-secondary leading-relaxed">
          We collaborate exclusively with leading international and local sanitary giants to provide original manufacturer warranty, reliable spare parts, and architectural consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
        {brands.map((b) => (
          <div
            key={b.name}
            className="bg-white p-lg rounded-xl border border-border/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
          >
            <div className="space-y-md">
              <div className="flex justify-between items-baseline">
                <h3 className="font-display-hero text-2xl text-primary font-bold">{b.name}</h3>
                <span className="text-xs font-semibold text-secondary uppercase bg-secondary/5 px-sm py-0.5 rounded-full border border-secondary/10">
                  {b.origin}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                {b.desc}
              </p>
            </div>
            <div className="border-t border-border/40 pt-md mt-lg flex items-center justify-between text-xs font-semibold text-primary">
              <span>Featured: <strong className="text-primary font-bold">{b.featured}</strong></span>
              <button
                onClick={() => navigate('/category/showers')}
                className="text-secondary hover:underline flex items-center gap-xs cursor-pointer font-bold"
              >
                Shop <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
