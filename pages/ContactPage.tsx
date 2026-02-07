
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">The Location</span>
            <h1 className="text-6xl md:text-8xl font-bold text-slate-950 mb-10 tracking-tight">Visit The <br/> Lounge.</h1>
            <p className="text-slate-500 text-xl mb-16 leading-relaxed font-light">
              Experience the atmosphere in person. Our flagship salon in Andheri West is designed to be your serene escape from the city hustle.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-slate-950 font-black uppercase text-xs tracking-widest mb-4">Flagship Address</h4>
                  <p className="text-slate-600 text-lg leading-relaxed">Crystal Mall, Level 2,<br/>Andheri West, Mumbai 400053</p>
               </div>
               <div>
                  <h4 className="text-slate-950 font-black uppercase text-xs tracking-widest mb-4">Direct Lines</h4>
                  <p className="text-slate-600 text-lg font-bold">+91 7738839027</p>
                  <p className="text-slate-600 text-lg font-medium">Topbinstales@gmail.com</p>
               </div>
               <div>
                  <h4 className="text-slate-950 font-black uppercase text-xs tracking-widest mb-4">Hours of Style</h4>
                  <p className="text-slate-600 text-lg leading-relaxed">Mon - Sat: 9:00 AM - 9:00 PM<br/>Sun: Private Sessions Only</p>
               </div>
               <div>
                  <h4 className="text-slate-950 font-black uppercase text-xs tracking-widest mb-4">Social Presence</h4>
                  <div className="flex space-x-6 mt-2">
                     <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-2xl"><i className="fa-brands fa-instagram"></i></a>
                     <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-2xl"><i className="fa-brands fa-facebook"></i></a>
                     <a href="#" className="text-slate-400 hover:text-amber-600 transition-colors text-2xl"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-slate-950 rounded-[4rem] h-[750px] w-full relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1524169358666-79f22c79745d?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[2s] group-hover:scale-110" 
                alt="Map Background"
              />
              <div className="relative z-10 text-center px-16">
                <div className="w-24 h-24 bg-amber-500 text-slate-950 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-10 shadow-2xl shadow-amber-500/40">
                  <i className="fa-solid fa-map-pin"></i>
                </div>
                <h3 className="text-4xl font-bold text-white mb-6">Arrive in Style</h3>
                <p className="text-slate-400 text-lg mb-12 font-light leading-relaxed">Valet parking available for all our guests. Enter through the main Crystal Mall atrium.</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  className="inline-flex bg-white text-slate-950 px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-amber-500 hover:text-white transition-all active:scale-95"
                >
                  Get Navigation <i className="fa-solid fa-location-arrow ml-3"></i>
                </a>
              </div>
            </div>
            {/* Artistic Blur */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
