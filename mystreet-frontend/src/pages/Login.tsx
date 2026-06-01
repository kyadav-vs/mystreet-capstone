import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      login(response.data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Professional Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200" 
          alt="Premium Sneakers" 
          className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale hover:scale-105 transition-transform duration-1000"
        />
        <div className="relative z-10 flex flex-col justify-end p-20 w-full">
          <h2 className="text-6xl font-semibold text-white leading-none tracking-tight mb-6">
            STEP INTO <br /> THE FUTURE.
          </h2>
          <p className="text-gray-300 text-sm uppercase tracking-[0.3em] font-bold">
            Curated Excellence for the Street.
          </p>
        </div>
        <div className="absolute top-12 left-12 z-10">
          <span className="text-white text-2xl font-semibold tracking-tight">MYSTREET<span className="text-red-600">.</span></span>
        </div>
      </div>

      {/* Right Side: Professional Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gray-50/50">
        <div className="w-full max-w-[440px]">
          <div className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">SIGN IN</h1>
            <p className="text-gray-500 font-medium">Welcome back. Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-8 text-xs font-bold uppercase tracking-wide border-l-4 border-red-600 flex items-center shadow-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-3 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-xl focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-bold placeholder:text-gray-200"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 ml-1">Password</label>
                <a href="#" className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400 hover:text-slate-900 transition-colors">Forgot Password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-xl focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all font-bold placeholder:text-gray-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-red-600 transition-all active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-black/20 flex items-center justify-center space-x-3"
            >
              <span>{loading ? 'Verifying...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="mt-12 text-center text-xs font-bold uppercase tracking-wide text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-slate-900 hover:text-red-600 transition-colors underline decoration-2 underline-offset-4 decoration-black/10 hover:decoration-red-600">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
