
import React, { useState, useEffect } from 'react';
import { db } from '../store';
import { User, Appointment, AppointmentStatus, Service, Stylist } from '../types';

interface UserDashboardProps {
  user: User;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const services = db.getServices();
  const stylists = db.getStylists();

  useEffect(() => {
    const allApps = db.getAppointments();
    setAppointments(allApps.filter(a => a.userId === user.id).sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()));
  }, [user.id]);

  const handleCancel = (id: string) => {
    const app = appointments.find(a => a.id === id);
    if (!app) return;

    const appointmentTime = new Date(app.date + ' ' + app.time).getTime();
    if (appointmentTime < Date.now()) {
      alert("Past sessions cannot be adjusted.");
      return;
    }

    if (window.confirm("Do you want to revoke this booking request?")) {
      const allApps = db.getAppointments();
      const updatedApps = allApps.map(a => a.id === id ? { ...a, status: AppointmentStatus.CANCELLED } : a);
      db.saveAppointments(updatedApps);
      setAppointments(updatedApps.filter(a => a.userId === user.id));
    }
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case AppointmentStatus.CONFIRMED: return 'bg-green-100 text-green-700';
      case AppointmentStatus.COMPLETED: return 'bg-blue-100 text-blue-700';
      case AppointmentStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Hello, {user.fullName.split(' ')[0]}</h1>
            <p className="text-slate-500 text-lg">Your personal style headquarters. Review your upcoming and past salon visits.</p>
          </div>
          <div className="mt-8 md:mt-0 flex items-center space-x-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 text-xl mr-5">
                 <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div>
                <span className="text-slate-900 font-black text-2xl block leading-none">{appointments.filter(a => a.status !== AppointmentStatus.CANCELLED).length}</span>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Sessions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-50">
            <h2 className="text-2xl font-bold text-slate-900">Appointment History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-10 py-6">Treatment & Charges</th>
                  <th className="px-10 py-6">Assigned Artist</th>
                  <th className="px-10 py-6">Date & Time</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-24 text-center">
                      <div className="max-w-xs mx-auto">
                        <i className="fa-solid fa-calendar-day text-5xl text-slate-100 mb-6"></i>
                        <p className="text-slate-400 italic">No appointments booked yet. Why not treat yourself today?</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  appointments.map((app) => {
                    const service = services.find(s => s.id === app.serviceId);
                    const stylist = stylists.find(s => s.id === app.stylistId);
                    const canCancel = new Date(app.date + ' ' + app.time).getTime() > Date.now() && app.status !== AppointmentStatus.CANCELLED && app.status !== AppointmentStatus.COMPLETED;

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-10 py-10">
                           <div className="font-bold text-slate-900 text-lg">{service?.name}</div>
                           <div className="text-amber-600 font-bold text-sm">₹{service?.price}</div>
                        </td>
                        <td className="px-10 py-10">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 text-slate-400"><i className="fa-solid fa-user-ninja text-[10px]"></i></div>
                            <span className="text-slate-700 font-medium">{stylist?.name}</span>
                          </div>
                        </td>
                        <td className="px-10 py-10">
                          <div className="text-slate-900 font-bold">{new Date(app.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{app.time}</div>
                        </td>
                        <td className="px-10 py-10">
                          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-10 py-10">
                          {canCancel ? (
                            <button 
                              onClick={() => handleCancel(app.id)}
                              className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                            >
                              Cancel Booking
                            </button>
                          ) : (
                            <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Locked</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
