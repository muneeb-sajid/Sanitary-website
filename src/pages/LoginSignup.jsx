import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignup() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });

  const handleLoginChange = (e) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupChange = (e) => {
    setSignupForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Welcome back! Logged in as: ${loginForm.email}`);
    navigate('/');
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
    <main className="min-h-[80vh] flex items-center justify-center px-gutter-mobile md:px-gutter-desktop py-xxl bg-surface">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border/20 overflow-hidden">
          {/* Header Visual */}
          <div
            className="relative h-36 bg-cover bg-center flex items-end p-lg"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDK4VLcqS9A2mNaC80lx1CevbsKB-WSwgIWXXEhY83FMMsv-2fr7mcDqB8tI3zSJbTmtYEI7l4AujUCpZovnDycW4wyQNotjWM7mL5Z6-DqaiTzCVAUAO9tdxEFyJ0AKFKPqiH_FGP_KXlJ1zQMbIar5AFXKmZPBLimQtkP8sdmsbhvkvy_gImY62NHL7K5kyt8GZ4I_cQHDrlUf-WIpMxKjb3FM8pAxSocMlM9qrC9XSuedc6ZvyMb_Wl8ku0xSkxPO_ZnBpIJbk4')"
            }}
          >
            <div className="absolute inset-0 bg-primary/70"></div>
            <div className="relative z-10">
              <button onClick={() => navigate('/')} className="font-display-hero text-xl text-white uppercase tracking-tight font-bold cursor-pointer hover:opacity-80">
                Sanitary.pk
              </button>
              <p className="text-white/80 text-xs font-medium mt-0.5">Premium Architectural Hardware</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border/40">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-md text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'text-primary border-b-2 border-primary bg-surface/50'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-md text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'text-primary border-b-2 border-primary bg-surface/50'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-lg md:p-xl">
            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-md text-sm font-medium">
                <h2 className="font-headline-section text-2xl text-primary font-bold">Welcome back</h2>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Sign in to access your wishlist, track orders, and manage your profile.
                </p>

                <div className="flex flex-col gap-xs mt-md">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="login-email">
                    Email Address
                  </label>
                  <input
                    required
                    className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                    id="login-email"
                    name="email"
                    placeholder="you@email.com"
                    type="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    required
                    className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                    id="login-password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="flex justify-end">
                  <button type="button" className="text-xs text-secondary hover:underline cursor-pointer font-semibold">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 shadow-md cursor-pointer"
                >
                  Sign In to Account
                </button>

                <p className="text-center text-xs text-on-surface-variant font-medium">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('signup')} className="text-primary font-bold hover:underline cursor-pointer">
                    Create one now
                  </button>
                </p>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-md text-sm font-medium">
                <h2 className="font-headline-section text-2xl text-primary font-bold">Create Account</h2>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Join Sanitary.pk to unlock exclusive members-only discounts and early product launches.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mt-md">
                  <div className="flex flex-col gap-xs">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="signup-name">
                      Full Name
                    </label>
                    <input
                      required
                      className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                      id="signup-name"
                      name="name"
                      placeholder="Ahmed Salman"
                      type="text"
                      value={signupForm.name}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="signup-phone">
                      Phone Number
                    </label>
                    <input
                      required
                      className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                      id="signup-phone"
                      name="phone"
                      placeholder="0300-1234567"
                      type="text"
                      value={signupForm.phone}
                      onChange={handleSignupChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="signup-email">
                    Email Address
                  </label>
                  <input
                    required
                    className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                    id="signup-email"
                    name="email"
                    placeholder="you@email.com"
                    type="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="signup-password">
                      Password
                    </label>
                    <input
                      required
                      className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                      id="signup-password"
                      name="password"
                      placeholder="••••••••"
                      type="password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider" htmlFor="signup-confirm">
                      Confirm Password
                    </label>
                    <input
                      required
                      className="bg-surface-container-low border border-border/60 rounded-lg px-md py-2.5 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-primary w-full"
                      id="signup-confirm"
                      name="confirm"
                      placeholder="••••••••"
                      type="password"
                      value={signupForm.confirm}
                      onChange={handleSignupChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-md font-bold rounded-lg hover:bg-secondary transition-all duration-300 shadow-md cursor-pointer mt-sm"
                >
                  Create My Account
                </button>

                <p className="text-center text-xs text-on-surface-variant font-medium">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('login')} className="text-primary font-bold hover:underline cursor-pointer">
                    Sign in here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
