import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationModal from '../components/NotificationModal';

export default function LoginSignup() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalUsername, setModalUsername] = useState('');
  const loginTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (loginTimeoutRef.current) clearTimeout(loginTimeoutRef.current);
    };
  }, []);

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupChange = (e) => {
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const deriveUsername = (email) => {
    if (!email) return 'User';
    const namePart = email.split('@')[0];
    return namePart
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    if (loginTimeoutRef.current) {
      clearTimeout(loginTimeoutRef.current);
      loginTimeoutRef.current = null;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = deriveUsername(loginForm.email);
    setModalUsername(username);
    setShowLoginModal(true);
    loginTimeoutRef.current = setTimeout(() => {
      setShowLoginModal(false);
      navigate('/');
    }, 2200);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirm) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    alert(`Account created! Welcome, ${signupForm.name}!`);
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-surface px-4 md:px-gutter-desktop py-16 flex items-center justify-center">
      <div className="w-full max-w-5xl grid gap-12 lg:grid-cols-[1.05fr_1.2fr]">
        <aside className="hidden lg:flex rounded-[32px] bg-primary text-white p-10 flex-col justify-between overflow-hidden shadow-2xl">
          <div>
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-white/80 font-semibold">
                <span className="inline-block w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-base">S</span>
                Sanitary.pk
              </Link>
              <h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-tight">Premium account access for architects, contractors and homeowners.</h1>
              <p className="mt-6 max-w-lg text-sm text-white/80 leading-7">
                Sign in or create an account to manage orders, unlock member pricing, and get first access to new collections.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Fast Checkout</p>
                <p className="mt-2 text-base font-semibold">Save your details for secure, faster ordering.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Order Tracking</p>
                <p className="mt-2 text-base font-semibold">View shipment status for every premium sanitary order.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Exclusive Support</p>
                <p className="mt-2 text-base font-semibold">Get priority assistance for technical and installation queries.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-sm text-white/70">
            <p className="font-semibold">Need help?</p>
            <p className="mt-2">Call us at <span className="text-white">+92 42 111-SAN-PK</span> or email <span className="text-white">sales@sanitary.pk</span></p>
          </div>
        </aside>

        <section className="rounded-[32px] bg-white shadow-2xl border border-border/70 overflow-hidden">
          <div className="flex border-b border-border/70 bg-surface p-2">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition ${
                activeTab === 'login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition ${
                activeTab === 'signup'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8 md:p-10">
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">Welcome back</h2>
                  <p className="mt-3 text-sm text-on-surface-variant">Sign in to manage orders, track deliveries, and save your favorites.</p>
                </div>

                <div className="space-y-4">
                  <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="login-email">
                    Email address
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="you@email.com"
                    className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-on-surface-variant">
                  <button type="button" className="font-semibold text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary">
                  Sign In to Account
                </button>

                <p className="text-center text-sm text-on-surface-variant">
                  Don’t have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('signup')} className="font-semibold text-primary hover:underline">
                    Create one now
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">Create your account</h2>
                  <p className="mt-3 text-sm text-on-surface-variant">Register and get access to member pricing, order history, and fast support.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="signup-name">
                      Full name
                    </label>
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      required
                      value={signupForm.name}
                      onChange={handleSignupChange}
                      placeholder="Ahmed Salman"
                      className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="signup-phone">
                      Phone number
                    </label>
                    <input
                      id="signup-phone"
                      name="phone"
                      type="text"
                      required
                      value={signupForm.phone}
                      onChange={handleSignupChange}
                      placeholder="0300-1234567"
                      className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="signup-email">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    placeholder="you@email.com"
                    className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="signup-password">
                      Password
                    </label>
                    <input
                      id="signup-password"
                      name="password"
                      type="password"
                      required
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.24em] font-semibold text-on-surface-variant" htmlFor="signup-confirm">
                      Confirm password
                    </label>
                    <input
                      id="signup-confirm"
                      name="confirm"
                      type="password"
                      required
                      value={signupForm.confirm}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-border/70 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary">
                  Create My Account
                </button>

                <p className="text-center text-sm text-on-surface-variant">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('login')} className="font-semibold text-primary hover:underline">
                    Sign in here
                  </button>
                </p>
              </form>
            )}
          </div>
        </section>
      <NotificationModal
        open={showLoginModal}
        title="Logged In"
        message={`Hello, ${modalUsername}. You are now signed in.`}
        onClose={closeLoginModal}
      />
      </div>
    </main>
  );
}
