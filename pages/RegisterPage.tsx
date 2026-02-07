
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../store';
import { User, UserRole, Gender } from '../types';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    gender: Gender.FEMALE
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = db.getUsers();
    if (users.some(u => u.email === formData.email)) {
      setError('Email already registered.');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      role: UserRole.USER
    };

    db.saveUsers([...users, newUser]);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
      <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-xl p-10 md:p-14 border border-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Create Account</h2>
          <p className="text-slate-500">Join our community and enjoy luxury grooming</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input 
              required
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
            <input 
              required
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
            <select 
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value as Gender})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-white"
            >
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
              <option value={Gender.OTHER}>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              required
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          <div className="md:col-span-2 pt-4">
            <button type="submit" className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition-all shadow-lg text-lg">
              Complete Registration
            </button>
          </div>
        </form>

        <div className="mt-10 text-center text-slate-500 text-sm">
          Already have an account? <Link to="/login" className="text-amber-600 font-bold hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
