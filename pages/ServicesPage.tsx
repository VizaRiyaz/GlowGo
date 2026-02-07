
import React from 'react';
import { db } from '../store';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const services = db.getServices();

  return (
    <div className="min-h-screen bg-slate-50 py-32 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-32">
          <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">The Collection</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-10 text-slate-950 tracking-tight">Our Services</h1>
          <p className="text-slate-500 text-xl font-light leading-relaxed">
            Meticulously curated treatments combining heritage techniques with avant-garde styling. Select your transformation below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all duration-700">
              <div className="h-[450px] relative overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                
                <div className="absolute top-10 left-10">
                   <div className="bg-white/10 backdrop-blur-xl text-white px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/20">
                     <i className="fa-regular fa-clock mr-2 text-amber-500"></i>{service.duration} mins
                   </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <div className="text-amber-400 font-black text-4xl mb-2">₹{service.price}</div>
                  <h3 className="text-4xl font-bold text-white tracking-tight">{service.name}</h3>
                </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <p className="text-slate-500 text-lg mb-12 leading-relaxed h-28 overflow-hidden font-light">{service.description}</p>
                <Link 
                  to="/booking" 
                  state={{ preSelectedService: service.id }}
                  className="mt-auto block w-full text-center bg-slate-950 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-amber-600 transition-all shadow-xl active:scale-[0.98]"
                >
                  Reserve Slot
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Private Concierge Banner */}
        <div className="mt-40 p-16 md:p-32 bg-slate-950 rounded-[5rem] text-white relative overflow-hidden text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">Private Styling <br/> & Group Bookings</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-light">We offer exclusive after-hours sessions for high-profile clients and curated packages for wedding parties.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-end">
              <a href="mailto:Topbinstales@gmail.com" className="bg-white text-slate-950 px-14 py-6 rounded-3xl font-black text-xl hover:bg-amber-500 transition-all shadow-2xl">
                Email Inquiry
              </a>
              <a href="tel:+917738839027" className="bg-white/5 border border-white/10 text-white px-14 py-6 rounded-3xl font-bold text-xl hover:bg-white/10 transition-all">
                Call Concierge
              </a>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
