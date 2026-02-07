
import React, { useState, useEffect } from 'react';
import { db } from '../store';
import { Appointment, Service, Stylist, AppointmentStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'stylists'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  
  const [filterDate, setFilterDate] = useState('');
  const [filterService, setFilterService] = useState('');

  // Service State
  const [newService, setNewService] = useState({ name: '', price: 0, duration: 30, description: '', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' });

  // Stylist State
  const [newStylist, setNewStylist] = useState({ name: '', specialization: '', startTime: '09:00', endTime: '21:00' });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setAppointments(db.getAppointments());
    setServices(db.getServices());
    setStylists(db.getStylists());
  };

  const updateAppStatus = (id: string, status: AppointmentStatus) => {
    const allApps = db.getAppointments();
    const updated = allApps.map(a => a.id === id ? { ...a, status } : a);
    db.saveAppointments(updated);
    refreshData();
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const s: Service = { id: Math.random().toString(36).substr(2, 9), ...newService };
    const updated = [...services, s];
    db.saveServices(updated);
    setNewService({ name: '', price: 0, duration: 30, description: '', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' });
    refreshData();
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm("Remove this service?")) {
      const updated = services.filter(s => s.id !== id);
      db.saveServices(updated);
      refreshData();
    }
  };

  const handleAddStylist = (e: React.FormEvent) => {
    e.preventDefault();
    const s: Stylist = { id: Math.random().toString(36).substr(2, 9), ...newStylist };
    const updated = [...stylists, s];
    db.saveStylists(updated);
    setNewStylist({ name: '', specialization: '', startTime: '09:00', endTime: '21:00' });
    refreshData();
  };

  const handleDeleteStylist = (id: string) => {
    if (window.confirm("Remove this team member?")) {
      const updated = stylists.filter(s => s.id !== id);
      db.saveStylists(updated);
      refreshData();
    }
  };

  const filteredApps = appointments.filter(a => {
    const matchesDate = filterDate ? a.date === filterDate : true;
    const matchesService = filterService ? a.serviceId === filterService : true;
    return matchesDate && matchesService;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Salon Manager <span className="text-amber-500">Pro</span></h1>
          <div className="mt-6 md:mt-0 flex p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
            {(['appointments', 'services', 'stylists'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-bold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Appointments */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-wrap gap-6 items-center justify-between">
              <h2 className="text-2xl font-bold">Booking Dashboard</h2>
              <div className="flex flex-wrap gap-4">
                <input 
                  type="date" 
                  value={filterDate} 
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-5 py-2.5 rounded-xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none text-sm font-medium"
                />
                <select 
                  value={filterService} 
                  onChange={(e) => setFilterService(e.target.value)}
                  className="px-5 py-2.5 rounded-xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none text-sm font-medium"
                >
                  <option value="">All Services</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {(filterDate || filterService) && (
                  <button onClick={() => {setFilterDate(''); setFilterService('');}} className="text-amber-600 font-bold text-sm">Reset</button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-[0.2em]">
                  <tr>
                    <th className="px-10 py-5">Client Profile</th>
                    <th className="px-10 py-5">Treatment Details</th>
                    <th className="px-10 py-5">Timing</th>
                    <th className="px-10 py-5">Status</th>
                    <th className="px-10 py-5">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredApps.length === 0 ? (
                    <tr><td colSpan={5} className="px-10 py-20 text-center text-slate-300 italic">No bookings found for current selection.</td></tr>
                  ) : filteredApps.map(app => {
                    const svc = services.find(s => s.id === app.serviceId);
                    const sty = stylists.find(s => s.id === app.stylistId);
                    return (
                      <tr key={app.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-10 py-8">
                          <div className="font-bold text-slate-900">{app.userName}</div>
                          <div className="text-slate-400 text-xs">Ref: {app.id.toUpperCase()}</div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="font-bold text-amber-700">{svc?.name}</div>
                          <div className="text-slate-500 text-sm">Specialist: {sty?.name}</div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="font-bold">{app.date}</div>
                          <div className="text-slate-400 text-sm">{app.time}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            app.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex space-x-4">
                            {app.status === AppointmentStatus.PENDING && (
                              <button onClick={() => updateAppStatus(app.id, AppointmentStatus.CONFIRMED)} className="text-green-600 hover:text-green-800 font-bold text-xs flex items-center"><i className="fa-solid fa-check-double mr-1"></i> Confirm</button>
                            )}
                            {app.status === AppointmentStatus.CONFIRMED && (
                                <button onClick={() => updateAppStatus(app.id, AppointmentStatus.COMPLETED)} className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center"><i className="fa-solid fa-flag-checkered mr-1"></i> Done</button>
                            )}
                            {app.status !== AppointmentStatus.CANCELLED && app.status !== AppointmentStatus.COMPLETED && (
                              <button onClick={() => updateAppStatus(app.id, AppointmentStatus.CANCELLED)} className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center"><i className="fa-solid fa-ban mr-1"></i> Stop</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Services */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-2xl font-bold mb-8">Add Treatment</h3>
                <form onSubmit={handleAddService} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Service Name</label>
                    <input required type="text" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Price (₹)</label>
                      <input required type="number" value={newService.price} onChange={e => setNewService({...newService, price: Number(e.target.value)})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Time (Min)</label>
                      <input required type="number" value={newService.duration} onChange={e => setNewService({...newService, duration: Number(e.target.value)})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                    <input required type="text" value={newService.image} onChange={e => setNewService({...newService, image: e.target.value})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white font-bold py-4 rounded-2xl hover:bg-amber-600 transition-all shadow-lg">Create Entry</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-5">Treatment</th>
                      <th className="px-10 py-5">Charges</th>
                      <th className="px-10 py-5">Duration</th>
                      <th className="px-10 py-5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {services.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-10 py-6 font-bold text-slate-900">{s.name}</td>
                        <td className="px-10 py-6 text-amber-600 font-bold">₹{s.price}</td>
                        <td className="px-10 py-6 text-slate-500 font-medium">{s.duration} mins</td>
                        <td className="px-10 py-6">
                          <button onClick={() => handleDeleteService(s.id)} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Stylists */}
        {activeTab === 'stylists' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-2xl font-bold mb-8">Add Artist</h3>
                <form onSubmit={handleAddStylist} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Artist Name</label>
                    <input required type="text" value={newStylist.name} onChange={e => setNewStylist({...newStylist, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Expertise</label>
                    <input required type="text" value={newStylist.specialization} onChange={e => setNewStylist({...newStylist, specialization: e.target.value})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" placeholder="e.g. Master Stylist" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Shift Start</label>
                      <input required type="time" value={newStylist.startTime} onChange={e => setNewStylist({...newStylist, startTime: e.target.value})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Shift End</label>
                      <input required type="time" value={newStylist.endTime} onChange={e => setNewStylist({...newStylist, endTime: e.target.value})} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-amber-500 focus:outline-none font-medium" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white font-bold py-4 rounded-2xl hover:bg-amber-600 transition-all shadow-lg">Onboard Artist</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stylists.map(s => (
                  <div key={s.id} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -translate-y-8 translate-x-8 group-hover:bg-amber-100 transition-colors"></div>
                    <button 
                      onClick={() => handleDeleteStylist(s.id)} 
                      className="absolute top-8 right-8 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <i className="fa-solid fa-user-minus text-xl"></i>
                    </button>
                    <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 text-3xl mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">{s.name}</h4>
                    <p className="text-amber-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-6">{s.specialization}</p>
                    <div className="flex items-center text-slate-400 text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl inline-flex">
                      <i className="fa-regular fa-clock mr-3"></i>
                      <span>{s.startTime} - {s.endTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
