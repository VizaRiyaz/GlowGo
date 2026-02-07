
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../store';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = db.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
      const from = (location.state as any)?.from || (user.role === 'admin' ? '/admin' : '/dashboard');
      navigate(from);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-500">Sign in to your Glow & Go account</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account? <Link to="/register" className="text-amber-600 font-bold hover:underline">Register now</Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">Admin Access</p>
          <p className="text-xs text-slate-400">Email: admin@glowgo.com | Pass: admin</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
