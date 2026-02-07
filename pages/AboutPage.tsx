
import React from 'react';
import { db } from '../store';

const AboutPage: React.FC = () => {
  const stylists = db.getStylists();

  return (
    <div className="bg-white">
      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800" className="rounded-3xl h-80 object-cover mt-12" alt="Salon detail" />
            <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800" className="rounded-3xl h-80 object-cover" alt="Styling tools" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-amber-600 font-bold tracking-widest uppercase mb-4 block">Our Story</span>
          <h2 className="text-5xl font-bold mb-8">Crafting Confidence Since 2012</h2>
          <p className="text-slate-500 text-lg mb-6 leading-relaxed">
            Founded by a group of passionate stylists, Glow & Go Salon was born out of a desire to create a space where luxury meets comfort. We believe that everyone deserves to feel beautiful, and our mission is to provide the highest quality hair and beauty services.
          </p>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            Over the past decade, we've grown into a award-winning sanctuary for those seeking excellence in grooming. Our team of master artists constantly pushes boundaries to bring you the latest trends while honoring timeless techniques.
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-amber-600">12k+</div>
              <p className="text-slate-400 text-sm font-medium uppercase mt-1">Happy Clients</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">15+</div>
              <p className="text-slate-400 text-sm font-medium uppercase mt-1">Expert Artists</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">10+</div>
              <p className="text-slate-400 text-sm font-medium uppercase mt-1">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <i className="fa-solid fa-gem text-amber-500 text-4xl mb-6"></i>
              <h3 className="text-2xl font-bold mb-4">Quality First</h3>
              <p className="text-slate-400">We use only premium, eco-friendly products that are kind to your hair and skin.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <i className="fa-solid fa-heart text-amber-500 text-4xl mb-6"></i>
              <h3 className="text-2xl font-bold mb-4">Customer Care</h3>
              <p className="text-slate-400">Your satisfaction is our priority. We listen, advise, and deliver personalized results.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <i className="fa-solid fa-wand-magic-sparkles text-amber-500 text-4xl mb-6"></i>
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-slate-400">We stay ahead of trends through continuous training and research in beauty tech.</p>
            </div>
          </div>
        </div>
        {/* Ornaments */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Team Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Master Stylists</h2>
          <p className="text-slate-500">The talented individuals who make the magic happen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stylists.map((stylist, i) => (
            <div key={stylist.id} className="group">
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[3/4] mb-6">
                <img 
                  src={`https://picsum.photos/600/800?random=${i + 10}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={stylist.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="text-white">
                    <p className="text-amber-500 font-bold mb-1">{stylist.specialization}</p>
                    <div className="flex space-x-3 text-lg">
                      <a href="#"><i className="fa-brands fa-instagram"></i></a>
                      <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stylist.name}</h3>
              <p className="text-slate-400">Master Stylist</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
