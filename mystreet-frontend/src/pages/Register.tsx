import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', { 
        email, 
        password,
        isAdmin: false 
      });
      login(response.data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Professional Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gray-50/50">
        <div className="w-full max-w-[440px]">
          <div className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4 uppercase">Join the Street</h1>
            <p className="text-gray-500 font-medium">Create your account and start your MyStreeT journey today.</p>
          </div>

          {error && (
            <div className="bg-slate-900 text-white p-4 rounded-lg mb-8 text-xs font-bold uppercase tracking-wide border-l-4 border-red-600 flex items-center shadow-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-3 ml-1">Password</label>
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

            <div className="relative">
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-3 ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <span>{loading ? 'Creating...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="mt-12 text-center text-xs font-bold uppercase tracking-wide text-gray-400">
            Already a member?{' '}
            <Link to="/login" className="text-slate-900 hover:text-red-600 transition-colors underline decoration-2 underline-offset-4 decoration-black/10 hover:decoration-red-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Professional Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200" 
          alt="Premium Sneakers" 
          className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale hover:scale-105 transition-transform duration-1000"
        />
        <div className="relative z-10 flex flex-col justify-end p-20 w-full text-right">
          <h2 className="text-6xl font-semibold text-white leading-none tracking-tight mb-6 uppercase">
            Define <br /> Your Path.
          </h2>
          <p className="text-gray-300 text-sm uppercase tracking-[0.3em] font-bold">
            Exclusive Access. Limitless Style.
          </p>
        </div>
        <div className="absolute top-12 right-12 z-10">
          <span className="text-white text-2xl font-semibold tracking-tight">MYSTREET<span className="text-red-600">.</span></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
