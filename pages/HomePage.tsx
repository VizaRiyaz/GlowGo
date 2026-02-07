
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../store';

const HomePage: React.FC = () => {
  const services = db.getServices().slice(0, 3);
  
  const testimonials = [
    { id: '1', name: 'Arvind Swamy', rating: 5, comment: 'The precision is simply unmatched. Arjun understands hair architecture like no one else in Mumbai.', avatar: 'https://i.pravatar.cc/150?u=arvind' },
    { id: '2', name: 'Sameer Khan', rating: 5, comment: 'The Royal Beard Sculpture is a spiritual experience. Best service I have had in years.', avatar: 'https://i.pravatar.cc/150?u=sameer' },
    { id: '3', name: 'Meera Rajput', rating: 5, comment: 'Priya is a magician with colors. My hair has never felt so vibrant and healthy.', avatar: 'https://i.pravatar.cc/150?u=meera' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Premium Hero Section */}
      <section className="relative h-screen bg-slate-950 flex items-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512690190486-857e5b3c883e?auto=format&fit=crop&q=80&w=2000" 
            alt="Elite Salon Ambiance" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          {/* Animated Glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px]">Mumbai's Premier Style Lounge</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-bold text-white leading-[0.95] mb-10 tracking-tight">
              Evolve Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700">Aesthetic.</span>
            </h1>
            <p className="text-slate-400 text-xl md:text-2xl mb-12 font-light leading-relaxed max-w-2xl border-l-2 border-amber-500/30 pl-8">
              Where razor-sharp precision meets timeless luxury. Experience the pinnacle of grooming at Glow & Go.
            </p>
            <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-8">
              <Link to="/booking" className="group bg-amber-500 text-slate-950 px-14 py-6 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(245,158,11,0.3)] text-center flex items-center justify-center">
                Secure Appointment <i className="fa-solid fa-arrow-right-long ml-4 group-hover:translate-x-2 transition-transform"></i>
              </Link>
              <Link to="/services" className="bg-white/5 backdrop-blur-xl text-white border border-white/20 px-14 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all text-center">
                The Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Brand Signatures */}
        <div className="absolute bottom-12 right-12 hidden lg:flex space-x-12">
           <div className="text-right">
              <span className="block text-amber-500 font-black text-3xl">12k+</span>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Masterpieces Created</span>
           </div>
           <div className="text-right">
              <span className="block text-amber-500 font-black text-3xl">4.9/5</span>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Client Satisfaction</span>
           </div>
        </div>
      </section>

      {/* Iconic Services Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 space-y-8 lg:space-y-0">
            <div className="max-w-3xl">
              <h2 className="text-slate-950 text-5xl md:text-7xl font-bold mb-8 leading-tight">Elite Artistry for <br/>The Modern Soul</h2>
              <p className="text-slate-500 text-xl leading-relaxed">Each stroke of the brush, each cut of the blade is a testament to our dedication to perfection.</p>
            </div>
            <Link to="/services" className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl">
              View All Services
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, idx) => (
              <div key={service.id} className="group relative bg-slate-50 rounded-[3rem] overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700">
                <div className="h-[450px] overflow-hidden relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Price Tag */}
                  <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-2xl">
                    <span className="text-amber-400 font-black text-xl">₹{service.price}</span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <h3 className="text-white text-3xl font-bold mb-4">{service.name}</h3>
                    <p className="text-slate-300 font-light mb-8 line-clamp-2">{service.description}</p>
                    <Link to="/booking" state={{ preSelectedService: service.id }} className="inline-flex items-center text-amber-500 font-bold hover:text-white transition-colors group/btn">
                      Reserve Now <i className="fa-solid fa-chevron-right ml-2 text-xs group-hover/btn:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Glow Experience */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Why Choose Us</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">The Glow & Go <br/>Philosophy</h2>
            <div className="space-y-12">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-amber-500 text-2xl mr-8 flex-shrink-0 border border-white/10">
                  <i className="fa-solid fa-scissors"></i>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">Architectural Precision</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">We don't just cut hair; we design silhouettes that enhance your natural features and bone structure.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-amber-500 text-2xl mr-8 flex-shrink-0 border border-white/10">
                  <i className="fa-solid fa-gem"></i>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">Ultra-Premium Products</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">We exclusively use Oribe, Balmain Hair Couture, and high-end Ayurvedic oils for a sensory masterpiece.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[4rem] overflow-hidden aspect-square relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Barbering Tools" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[4rem]"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-amber-500 p-10 rounded-[2.5rem] shadow-2xl hidden md:block animate-bounce-slow">
              <p className="text-slate-950 font-black text-4xl mb-1 italic">#GlowMumbai</p>
              <p className="text-slate-900 font-bold text-sm uppercase tracking-widest opacity-80">Style Icon Community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-bold mb-4">Voices of Elegance</h2>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-white relative">
                 <div className="absolute -top-6 left-12 bg-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-quote-left text-slate-950 text-xl"></i>
                 </div>
                <div className="flex text-amber-400 mb-8 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star text-sm ${i < t.rating ? '' : 'text-slate-200'}`}></i>
                  ))}
                </div>
                <p className="text-slate-600 text-xl font-light italic leading-relaxed mb-10">"{t.comment}"</p>
                <div className="flex items-center">
                  <img src={t.avatar} className="w-16 h-16 rounded-2xl mr-5 object-cover shadow-md" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-slate-950 text-lg">{t.name}</h4>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Loyal Member</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Direct CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-950 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-bold text-white mb-10">Ready to <span className="italic font-serif">Glow?</span></h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                   <Link to="/booking" className="w-full md:w-auto bg-amber-500 text-slate-950 px-20 py-7 rounded-3xl font-black text-2xl hover:bg-white transition-all shadow-2xl">
                      Book Instant
                   </Link>
                   <div className="flex flex-col items-start text-left">
                      <span className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-2">Concierge Support</span>
                      <a href="tel:+917738839027" className="text-white text-3xl font-bold hover:text-amber-500 transition-colors">+91 7738839027</a>
                      <a href="mailto:Topbinstales@gmail.com" className="text-slate-400 text-lg hover:text-white transition-colors">Topbinstales@gmail.com</a>
                   </div>
                </div>
             </div>
             {/* Art Pattern */}
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <i className="fa-solid fa-scissors text-[300px] -rotate-45 text-white"></i>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
