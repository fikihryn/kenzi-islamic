'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const router = useRouter();

  const goldColor = "#D9B67D";

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login gagal');

      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak terduga');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);

    // Check for admin login with mockup data
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      // Admin login successful
      setTimeout(() => {
        setAdminLoading(false);
        router.push('/AdminPage');
      }, 1000); // Small delay to show loading state
    } else {
      setAdminError('Invalid admin credentials');
      setAdminLoading(false);
    }
  };

  const toggleFormType = () => {
    setIsAdminLogin(!isAdminLogin);
    setError('');
    setAdminError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 font-poppins">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto overflow-hidden bg-white rounded-xl shadow-lg">
          
          {/* Left section with full image */}
          <motion.div 
            className="md:w-1/2 h-96 md:h-auto hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/loginlogo.jpg"
              alt="Login visual" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Form Section */}
          <motion.div 
            className="md:w-1/2 p-8 md:p-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-neutral-800">
                {isAdminLogin ? 'Admin Login' : 'Login to Your Account'}
              </h2>
              <p className="mt-2 text-black">
                {isAdminLogin ? 'Admin access only' : 'Please enter your details to continue'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isAdminLogin ? (
                // Admin Login Form
                <motion.div
                  key="adminForm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {adminError && (
                    <motion.div 
                      className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-sm text-red-700"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{adminError}</span>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleAdminSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="admin-username" className="block text-sm font-medium text-neutral-700 mb-1">
                        Username
                      </label>
                      <input
                        id="admin-username"
                        name="adminUsername"
                        type="text"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-neutral-300 rounded-lg placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#D9B67D] transition duration-150 text-black"
                        placeholder="Enter admin username"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-password" className="block text-sm font-medium text-neutral-700 mb-1">
                        Password
                      </label>
                      <input
                        id="admin-password"
                        name="adminPassword"
                        type="password"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-neutral-300 rounded-lg placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#D9B67D] transition duration-150 text-black"
                        placeholder="Enter admin password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <motion.button
                        type="submit"
                        disabled={adminLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150"
                        style={{ backgroundColor: goldColor }} // Changed from #4B5563 to goldColor
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {adminLoading && (
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {adminLoading ? 'Logging in...' : 'Login as Admin'}
                      </motion.button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <button 
                      onClick={toggleFormType}
                      className="text-sm font-medium hover:underline"
                      style={{ color: goldColor }}
                    >
                      Back to User Login
                    </button>
                  </div>
                </motion.div>
              ) : (
                // User Login Form
                <motion.div
                  key="userForm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <motion.div 
                      className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-sm text-red-700"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleUserSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email-address" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-neutral-300 rounded-lg placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#D9B67D] transition duration-150 text-black"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                          Password
                        </label>
                        <Link href="/forgot-password" className="text-sm font-medium hover:underline" style={{ color: goldColor }}>
                          Forgot password?
                        </Link>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-neutral-300 rounded-lg placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#D9B67D] transition duration-150 text-black"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150"
                        style={{ backgroundColor: goldColor }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading && (
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {loading ? 'Signing in...' : 'Sign in'}
                      </motion.button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-neutral-600">
                      Don't have an account?{' '}
                      <Link href="/signup" className="font-medium hover:underline" style={{ color: goldColor }}>
                        Sign up now
                      </Link>
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button 
                      onClick={toggleFormType}
                      className="text-sm font-medium hover:underline"
                      style={{ color: goldColor }} // Changed from #4B5563 to goldColor
                    >
                      Login as Admin
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}