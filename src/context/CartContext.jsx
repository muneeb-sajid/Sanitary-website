import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const productsList = [
  // Commodes
  {
    id: 'master-commode',
    slug: 'master-one-piece-commode',
    name: 'Master One-Piece Commode - Premium Ceramic Edition',
    price: 42500,
    originalPrice: 48000,
    brand: 'Master',
    sku: 'MST-OPC-2024',
    category: 'commodes',
    badge: 'NEW',
    rating: 4.5,
    reviewsCount: 48,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK_6sxrkelJe2CUhM0PANqTVL7M64hg91JM_WYyItiuUff56WoOeQMWbDQJDHSiTY-EtdlNA5ohh3hhmQh8IGmRCuQe3n09g1nMPaCogV5sA1y44quDQSWrWD_GoUOcSvEKV5yO4su8sSMwq7ULdr1ZgjTlaG8Nt3lKEkP8nJy9ghxmfa_v8W3d2YmfaebmfnB_uV2iobFMyzE9EXHpZ-USTTNbZrQHYODpbFdDPNvkrvzyLCi8bpqG-iWjFc9_M5Va1rfJimpPxk',
    thumbnails: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfYp2794rHzhe-Me5TnK-l9KLTYou61X9WujIZiwYPQGIYf2wJZCWYWJic_6x0sZB9d61Jy0OblLSyy_9M4PRzNh_HJPmZz8VbJZv6atJqDfpE0B8qnAftY0DBYmPKYQ6tWnZR5z_wb_0VoWzD1LnZQoI8SHlmz7CFRqLR6Y0SRUYxGT3SiE7xrcArnEsFoE8OB--lfK0bS_gTjIjGtNzSKMHOljqn6I76JiYLcnJKJ5VCnLWhgiUqvUqf4MbrcuGUtb3n049FnnI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAh0jGf77qt1Kq7M_nD_RXBXNXb5-RAWqqE8V9QMNdFbTD6YcIvcP-NW9miQOIgIDbzqyGm15pUCC9MCHgAF3r8eUXjBSqxv6IDI28RiTvd9Xv07Iyyh7qR-HBIxizt-L7zAfTsAjUuV5Y7nsPkPGvoKrON9HqIc02yIvE_tACnUoNqQZQ1uUCAfosMSWzkutYux-3pRKrjP8j5C27Cv8ofJEXDTGt8e8D_UNeLc-aaHDHh1Q_96z9hSfsXjhFkkEBHWIacjz-yR_w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6FQ7zuKE7Vvh76T-TGIpNm2jTeGxZ2nz2VubcBdXBR6wo8kfTLHXQEW_epqlEiOtG5XSRP8fzKzOINCnpjwfKN361NmvAyeHs2v_8M0CoFnbXU_NUoly5BYdxGBzQyOVcVgDIOm_Mw6Oj8XZnjkCnZqwyjTTCNWOrKs_utPageERln6hEoh-je5gRCsCm1eYSMP7bV5FHAeXqEAhIXmNmel-hMDFPRQggGs_bMWmfYziw91w-T-iAJWo8rlrKP_TxkdLYNFrwEU0'
    ],
    colors: ['Glossy White', 'Bone Ivory', 'Matte Charcoal'],
    materials: ['Vitreous China'],
    description: 'Elevate your bathroom\'s aesthetic with the Master One-Piece Commode. Engineered for both form and function, this commode features a sleek, floor-mounted design that eliminates gaps where dirt can hide. The premium ceramic construction is finished with a nano-glaze that prevents bacterial growth and staining.',
    specs: {
      'Material': 'High-Density Vitreous China',
      'Mounting Type': 'Floor Mounted',
      'Flush System': 'Siphonic Jet Dual Flush (3L/6L)',
      'Dimensions': '680mm x 380mm x 720mm',
      'Weight': '45 kg',
      'Seat': 'Ultra-quiet soft-close included'
    }
  },
  {
    id: 'toto-wallhung',
    slug: 'toto-wallhung-rimless',
    name: 'Wall-Hung Rimless Matte Black Commode',
    price: 82000,
    brand: 'TOTO',
    category: 'commodes',
    badge: 'PREMIUM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJkUisx1h48nU8EnTqEjN8yQDfXbUbte880np3voLpylz3rmVWI2YPxA0mcUCrS92rbGyWSiR5unvQPZnkCDWAf9tyoQ2Hjr2g6j3lkJF4d7jleQ7PxJxa4U_kqy1EtTPxCyC03NTKrgB5Pn_3WjwQG0EZEl1tepYwFPT4HHJwIMldl4ZEIrqZA4gd3ZdhcCtK9R7oJ2PJewc0jOZy2Csm0YFbbnmnLsRbWgi_EEnfSnE7CW8zUa3xOCLkRsH2UXIu59xJGTf0Jck',
    colors: ['Matte Black'],
    materials: ['Ceramic'],
    specs: { 'Brand': 'TOTO', 'Style': 'Wall Hung', 'Finish': 'Matte Black' }
  },
  {
    id: 'square-flush',
    slug: 'square-flush-commode',
    name: 'Square Flush Commode',
    price: 38900,
    brand: 'Master Premium',
    category: 'commodes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt9HSrA7b9LfaPoJXUr5XDsUHsPEJX0_-b0lTfV9ZOw_4trfy61AO6YnMkVbAqzjGIZtpo0IIiUOXIvojkVmVgHHp6rRPqeOeBxdbrJQoF1r5orhPpxx5n0PX3mGRUKGdCMssMj4hL5mtTn0ADOqZQp5u3P_AbGoNxuwMumWIDQFAvF_sl8O7gQJSKj4BOGxpzxJepKiQrb3ZJt28DIP-a4jp-FiXs276iYmR_dX8yOFwJF25ASuqC2It6QnDJhLhZkdU12x8nAqM'
  },
  {
    id: 'wall-hung-tank',
    slug: 'wall-hung-concealed-tank',
    name: 'Wall Hung Concealed Tank Commode',
    price: 52000,
    brand: 'Concept Series',
    category: 'commodes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5IWQfuGuV9aoUGV8FZDUNydqwvNv54kJdGOvjFriPXMalB1oqqDEw9BgDX4UYjUp13s0XKaY3Nw-r3waVx81a_9_O4X3d9EoYkR7mo6BRQN8cjg2d8NjbvQyr7kc-wC8bJyYup6DrI4ytk3Jsai4glpcswQXoSW0n4W0ELflgHMgUQgId3SjPWI6_CSCPJq3D8TySRsm2r4WNY3OEyVqUB9ipXIwdEqYfEnn7syRinUTbng35WbTkpmQPGLI6Juzwy95ysA-03YU'
  },
  {
    id: 'matching-bidet',
    slug: 'matching-floor-bidet',
    name: 'Matching Floor Bidet',
    price: 24500,
    brand: 'Master Series',
    category: 'commodes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_h94xhC7WkcEwva1_RrX4ADhbBeIvGjoo_B8-Lxzc8VEKvs68Zbwe5fjPJdVEFsJNnf-B-_gYmq7vvu-eg7LzNDVl6I_a6RydWPziTZnvnEohGcKoJDusEpjHNYDlXs1dKfn1VyN-c6XLcEC7P1yM8QxrC0aIvvp-Cch8UlU5AnGbqmm4XJSTixqLAzD_CYsCYPbQG3-xrTuAcwi9cDpCjLiNvfrW64oIU2JE7YXnzVanP4JZI7u6KAiV9isVnwV65fzLHO0J4QA'
  },

  // Showers
  {
    id: 'grohe-euphoria',
    slug: 'euphoria-system-310-rain-shower',
    name: 'Euphoria System 310 Rain Shower',
    price: 185000,
    brand: 'Grohe',
    category: 'showers',
    badge: 'Premium Choice',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNwwPWFZowS6LrQnp5jVFMLOVQqTydZh3MhDuO7TMofeuBFVyOzLBOjwyNGAxNrv7AK-LCBUE5Dyzp6ZZ1JJFnPRbaTnII8PP37XB7Y9_osTxQLXnPJu4ZGecu9RNr5-xuwQrthcf0_CtpyaLOhdKi1pVt5XRLIYzCuSwYfEcMnz9nrFNbEiry9y4bvE8E5nJPPGL0u0nBU8tDd0U7E32uw8vFynU09vNxTLblnKV63YwbuhJLOCdOQkFip1EWFSRTRZAc7VMGYQE',
    colors: ['Polished Chrome'],
    materials: ['Polished Chrome'],
    specs: { 'Brand': 'Grohe', 'Type': 'Rain Shower', 'Diameter': '310mm' }
  },
  {
    id: 'master-obsidian',
    slug: 'obsidian-series-shower-set',
    name: 'Obsidian Series Shower Set',
    price: 42500,
    brand: 'Master',
    category: 'showers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7GtldDdUeGeC2eSHHacR_vl4FS2M11dSutDc_vng-og8rVJarfd4VFIuZhmbIrf-vJtil4JBT1rrRHx8H_o8LFdWQqJuPbwqxdCiEMatp5RnQIvPmVyl6uS3_G1jUXd9EfF3OP_Cc33nu6JDpLXj4NyuN5blhJ-xysq9o0E6AP0D8vFpKMyp2XBM7-zQTa6By3uRKhNnRnqwYrqU6zX-Je3iA2jr10fqJdrlx2CJxDFviJj8Jo7ZlFb7psCcqoeICd4HGXUVCA9g',
    colors: ['Matte Black'],
    materials: ['Matte Black']
  },
  {
    id: 'porta-elite-mixer',
    slug: 'elite-thermostatic-mixer',
    name: 'Elite Thermostatic Mixer',
    price: 28900,
    brand: 'Porta',
    category: 'showers',
    badge: 'In Stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALk9CjmYCqMOaCWPSIssmAVRSCA7NAbmmDKRfWXyrhpSRWqMt4gqPN6okx9Vg11my4oGzKrUDGw-kQp1k-Zo84Ks4RM8j84MMlc3blTiRYom8CD--_U2hNlbwnaUbcTf-87_-ASi2FH_AwB_Qr3ZHF7wEKiZzsyczE3106Cu9viVnlCUfJFFYwbujoQnjkG-mjtWYtIXEpXM7vt8288exXvgrb-l0JdJUBM4WqGTelQ38f-FCwpjFVk2z-0W86-YpGxgU-eT9Dt4k',
    colors: ['Brushed Brass'],
    materials: ['Brushed Nickel']
  },
  {
    id: 'grohe-spa-panel',
    slug: 'spa-waterfall-ceiling-panel',
    name: 'Spa Waterfall Ceiling Panel',
    price: 215000,
    brand: 'Grohe',
    category: 'showers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkgFgmR-nbD0nZbjjKTHEyf493tp1R4o9T0Nxyf4YF8qBbQD-LQxuQ0O-1mQbRTQyO-0cLmh9t0pO4SQK6SYoRrY-OCUKrctgAZnslvmUQAhNAkGI-TbFdOViYF4LQJbZtXl-l8LvBzkuteM_Yk4ZlBfxML6ykaaOehQzAtrGQocYlUv-Z2YMJd14kX6H9NjvDD7LFOay4DZM_JHH31OPSp8XI7rslZTU4dIsTEflnQBAFoqDz_vU2-0vfbpFKw9sOFQeW03v9fNQ'
  },
  {
    id: 'master-hand-shower',
    slug: 'multi-function-hand-shower',
    name: 'Multi-Function Hand Shower',
    price: 8400,
    brand: 'Master',
    category: 'showers',
    badge: 'Sale -15%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAhHsOM3crujgJPIvthx91HzIZ071V_N6ZWupg56Id_f-8pPJ5YOnTNP9hDE5c8LxZ5m0SlZCU2Hj3GJ6xU6BPyW4XRhjdZGCL-otvL2SFjR5AMzMFJ5xLxfY56usPCsFkK2VrgBCGqxbaKYh56acIcrsweJO9lP8PGuyW9PbSdJvarq7GcLQLO3CIU3BjE3qevoJI4hwha12TZ_ArWq2OVDGC-BrF_kgq_s2YEK95LUURw0zIxuHWJQS7CTTJ8lJFjMwFsYRMw9A',
    colors: ['Polished Chrome'],
    materials: ['Polished Chrome']
  },
  {
    id: 'porta-concealed-mixer',
    slug: 'concealed-minimalist-mixer',
    name: 'Concealed Minimalist Mixer',
    price: 15200,
    brand: 'Porta',
    category: 'showers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVN3ADjBmiQ2pCU1ifPU33VhtYKmA5eMMYBwzVNL6zVajIKpCXBCuw9HmkJiG-tR0qtju-kX4DregsY5GrbZLMDxnyiEoaTT12BYJ3Xyvv8I9EgzlKPH5k-33-gOxsnPXsmKeFJBpCfPju3oXPlY8b1c6V2ys8LRi8AZ-dUAgQuVqVZC3ezygzsrhKrC0pO2BXh6F9ijA8hi2nF7eEILv1etd5DjyYHj5VAhobcJ_yqqJ5SC33A0VNcL06PFiiM_eUkp_CtjanDow'
  },
  {
    id: 'roca-l90',
    slug: 'l90-thermostatic-shower-system',
    name: 'L90 Thermostatic Shower System',
    price: 115000,
    brand: 'ROCA',
    category: 'showers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHY4B2yAEK_BjWrDJiD9JF7hZeUMClxNlvQ6SfYcUhA6-zV71akxUR6AoyRiPM2-kh_fa58CXfTCk6fpUFOmc4B2BIkPc7WZFsBt8jL4lgF1VnZ8D0qdana_iEBXx6FMv4o0-X4jCJcxSWoR7ufR0jIJSQeFxXLhE9RJZWpDld6oiaOXsSq11y-98VkCURrmfNultn4uwTJiyLEmX4jpd7bDF19RN3Au0Jyg9zuhchx_dNQtsleM8idXbyhTYz3tUUaUGxAJDs-TM'
  },

  // Faucets & Bathroom Fittings
  {
    id: 'grohe-essence-gold',
    slug: 'essence-new-basin-mixer-gold',
    name: 'Essence New Basin Mixer Gold',
    price: 45500,
    brand: 'GROHE',
    category: 'faucets',
    badge: 'NEW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOkak54yDgr1hvODZOXzKbUFWYGmJtIefwnFFmBxBr41z7r1OoVlU1cgV2OyZZ3wxC7Q-RsKbfGgBlO51sFV_psFWoEGhuHZhgjdjXn9cC5PPr0j-WZ89Otc6-CQfkmZuMzB9sk8Bl27bvbxcYpJCxVAQHXdcyPClEirqTwPERyF7ntqXnMcpv7u-fHmFf8dXE3UFBjJPbSAakctUzb9wicq3hbZePe5j_fDnquRxs-1uOkLfrkHFKZ4iXkNOx3n4kPBZ78Lu8ADo',
    colors: ['Polished Gold'],
    materials: ['Polished Gold']
  },
  {
    id: 'muslim-shower-gold',
    slug: 'brass-muslim-shower-gold',
    name: 'Brass Muslim Shower Gold',
    price: 4200,
    brand: 'Gold Series',
    category: 'faucets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKdFI_KJb9Gp9AB7CGOh9cmrqw7a4y1cNSfug8SZhXcuHdFCTyZBr6V-TRoeL2TaX0bX2--7XEMB6ar5VGa-kykkZFNBfF9-NIAacibNrqbYyR2qiUKSQsbazNbX8_G4i7mh7d3IsKyYBXliF6KTsX8diuI9n_ocNtBOuZfTSAQXtI39zfe_Vam2rn9bQ9a5JvtDU6WtlgazgflfWtgpD6zHEddXEVOHz9Urj7joYGvwFfVgRbDDNxL7x9ALiGYgam7Bz4Uqb9dRM'
  },

  // Kitchen Sinks & Faucets
  {
    id: 'kohler-malleco',
    slug: 'malleco-pull-down-kitchen-faucet',
    name: 'Malleco Pull-Down Kitchen Faucet',
    price: 38900,
    brand: 'KOHLER',
    category: 'kitchen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL4ybq-_-KL-NJn1xfQNOtFCoW31D8EklHJY2LMvwsYK_j0c6Lkjd7BQcPTwTR6f4T7SBlcvE7pNphpACvUh9MmHumrnFyFVPNjZTa5HU8_9pTORZ2zEcU7hBxcuN6czbHVkQDO0GSqqAD68Xd_plJvh2dTXtCl9o8LAgw9FlCWhblgdR7yYYg9EGdcGKinvRHuP_iJBQsXRhYo6JTWSScESV-N_C4jb6BMvuKR4Pt2p0JMcCOmi8W_K8vO5uphIEiOm3-6GYwOkU',
    colors: ['Brushed Steel', 'Matte Black']
  },

  // Bath Accessories
  {
    id: 'stone-basin-counter',
    slug: 'hand-carved-stone-wash-basin',
    name: 'Hand-Carved Stone Wash Basin Countertop',
    price: 18900,
    brand: 'Natural Craft',
    category: 'accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcUd4-0ZUIn_OqDKS2_Vot2HedulxVuw5I7QpL4NVirFACG5My30p5trUWp7mBqScxOoQHy-7IivqquDNOdtn1BARNw09cx97BS6YCLOe1CmlRN1FVzseVJuolV6fDULaG7-iVEO7efn_6PnG8zfto5mU-0VeeMvdCbX-7lgqDzom_TKxdfdfk9KFO2eeV7MWVt3Nga9od4SYzmI_qbiIwiT4OPgzs_lNT4b_g50vpA4vbJ6pUuRyS3CefgQVztmV4F1DNf5GEHGI'
  }
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    // Start with 2 items in cart to match Stitch screenshot indicators (often starts with 2)
    {
      id: 'master-commode',
      name: 'Master One-Piece Commode - Premium Ceramic Edition',
      price: 42500,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK_6sxrkelJe2CUhM0PANqTVL7M64hg91JM_WYyItiuUff56WoOeQMWbDQJDHSiTY-EtdlNA5ohh3hhmQh8IGmRCuQe3n09g1nMPaCogV5sA1y44quDQSWrWD_GoUOcSvEKV5yO4su8sSMwq7ULdr1ZgjTlaG8Nt3lKEkP8nJy9ghxmfa_v8W3d2YmfaebmfnB_uV2iobFMyzE9EXHpZ-USTTNbZrQHYODpbFdDPNvkrvzyLCi8bpqG-iWjFc9_M5Va1rfJimpPxk',
      brand: 'Master',
      color: 'Glossy White'
    },
    {
      id: 'muslim-shower-gold',
      name: 'Brass Muslim Shower Gold',
      price: 4200,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKdFI_KJb9Gp9AB7CGOh9cmrqw7a4y1cNSfug8SZhXcuHdFCTyZBr6V-TRoeL2TaX0bX2--7XEMB6ar5VGa-kykkZFNBfF9-NIAacibNrqbYyR2qiUKSQsbazNbX8_G4i7mh7d3IsKyYBXliF6KTsX8diuI9n_ocNtBOuZfTSAQXtI39zfe_Vam2rn9bQ9a5JvtDU6WtlgazgflfWtgpD6zHEddXEVOHz9Urj7joYGvwFfVgRbDDNxL7x9ALiGYgam7Bz4Uqb9dRM',
      brand: 'Gold Series',
      color: 'Polished Gold'
    }
  ]);

  const [shippingDetails, setShippingDetails] = useState({
    name: 'Ahmed Salman',
    address: 'Plot 123, Block-Y, DHA Phase 3',
    city: 'Lahore',
    phone: '0300-1234567',
    email: 'ahmed.salman@gmail.com'
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, bank, card
  const [orders, setOrders] = useState([]);
  const [latestOrderId, setLatestOrderId] = useState('');

  const addToCart = (product, qty = 1, color = '') => {
    setCart((prevCart) => {
      const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += qty;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image,
            brand: product.brand,
            color: selectedColor
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, color) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.color === color))
    );
  };

  const updateQuantity = (productId, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.color === color
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      items: [...cart],
      shippingDetails,
      paymentMethod,
      subtotal: getCartSubtotal(),
      shippingCost: getCartSubtotal() > 25000 ? 0 : 1500,
      total: getCartSubtotal() + (getCartSubtotal() > 25000 ? 0 : 1500),
      date: new Date().toLocaleDateString()
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setLatestOrderId(orderId);
    clearCart();
    return orderId;
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        shippingDetails,
        setShippingDetails,
        paymentMethod,
        setPaymentMethod,
        orders,
        latestOrderId,
        placeOrder,
        getCartSubtotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
