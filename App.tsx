
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole } from './types.ts';
import { db } from './store.ts';

// Pages
import HomePage from './pages/HomePage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import BookingPage from './pages/BookingPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

// 404 Component
const NotFoundPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-6">
    <div className="text-center">
      <h1 className="text-9xl font-black text-slate-900 mb-4 opacity-5">404</h1>
      <h2 className="text-5xl font-bold text-slate-950 mb-6">Page Not Found</h2>
      <p className="text-slate-500 text-xl mb-12 max-w-md mx-auto">
        It seems the style you are looking for hasn't been created yet or the page has moved.
      </p>
      <Link to="/" className="bg-amber-500 text-slate-950 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-950 hover:text-white transition-all shadow-xl">
        Return Home
      </Link>
    </div>
  </div>
);

// Components
const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-amber-600 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-lg mr-3">
                <i className="fa-solid fa-scissors"></i>
              </span>
              GLOW <span className="text-slate-900">& GO</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Home</Link>
            <Link to="/services" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Services</Link>
            <Link to="/about" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={user.role === UserRole.ADMIN ? "/admin" : "/dashboard"} className="bg-amber-100 text-amber-700 px-5 py-2 rounded-full font-bold hover:bg-amber-200 transition-colors">
                  {user.role === UserRole.ADMIN ? "Admin Panel" : "Dashboard"}
                </Link>
                <button onClick={onLogout} className="text-slate-400 hover:text-red-600 transition-colors">
                  <i className="fa-solid fa-power-off text-xl"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-slate-600 hover:text-amber-600 font-bold transition-colors">Login</Link>
                <Link to="/booking" className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-500/20">Book Now</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-6 px-6 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-600">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-600">Services</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-600">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-600">Contact</Link>
          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="space-y-4">
                <Link to={user.role === UserRole.ADMIN ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)} className="block text-amber-600 font-bold">My Account</Link>
                <button onClick={() => { onLogout(); setIsOpen(false); }} className="block text-red-600 font-bold">Logout</button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-slate-600 font-bold">Login</Link>
                <Link to="/booking" onClick={() => setIsOpen(false)} className="block bg-slate-900 text-white py-3 rounded-xl text-center font-bold">Book Appointment</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-950 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-3xl font-bold tracking-tighter text-amber-500">GLOW & GO</h3>
        <p className="text-slate-400 leading-relaxed">Luxury hair care, precision beard grooming, and rejuvenating skin treatments at the heart of the city.</p>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all"><i className="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-xl mb-6 border-b border-amber-500/30 pb-2 inline-block">Explore</h4>
        <ul className="space-y-3 text-slate-400">
          <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
          <li><Link to="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
          <li><Link to="/booking" className="hover:text-amber-500 transition-colors">Book Now</Link></li>
          <li><Link to="/about" className="hover:text-amber-500 transition-colors">Our Team</Link></li>
          <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-xl mb-6 border-b border-amber-500/30 pb-2 inline-block">Contact Info</h4>
        <ul className="space-y-4 text-slate-400">
          <li className="flex items-start">
            <i className="fa-solid fa-location-dot mt-1 mr-3 text-amber-500"></i>
            <span>Crystal Mall, Level 2,<br/>Andheri West, Mumbai 400053</span>
          </li>
          <li className="flex items-center">
            <i className="fa-solid fa-phone mr-3 text-amber-500"></i>
            <a href="tel:+917738839027" className="hover:text-amber-500">+91 7738839027</a>
          </li>
          <li className="flex items-center">
            <i className="fa-solid fa-envelope mr-3 text-amber-500"></i>
            <a href="mailto:Topbinstales@gmail.com" className="hover:text-amber-500">Topbinstales@gmail.com</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-xl mb-6 border-b border-amber-500/30 pb-2 inline-block">Timing</h4>
        <ul className="space-y-2 text-slate-400">
          <li className="flex justify-between"><span>Mon - Sat:</span> <span className="text-white font-medium">9 AM - 9 PM</span></li>
          <li className="flex justify-between"><span>Sunday:</span> <span className="text-amber-500 font-bold uppercase text-xs">Closed</span></li>
          <li className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800 italic text-sm">
            "Your style is our passion. Visit us for a transformative experience."
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
      &copy; 2024 Glow & Go Salon. Crafted for Excellence.
    </div>
  </footer>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(db.getCurrentUser());
  }, []);

  const handleLogin = (userData: User) => {
    db.setCurrentUser(userData);
    setUser(userData);
  };

  const handleLogout = () => {
    db.setCurrentUser(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-amber-500 selection:text-white">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
            <Route 
              path="/booking" 
              element={user ? <BookingPage user={user} /> : <Navigate to="/login" state={{ from: '/booking' }} />} 
            />
            <Route 
              path="/dashboard" 
              element={user && user.role === UserRole.USER ? <UserDashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user && user.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
