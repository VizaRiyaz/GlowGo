
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../store';
import { User, Service, Stylist, Gender, AppointmentStatus, Appointment } from '../types';

interface BookingPageProps {
  user: User;
}

const BookingPage: React.FC<BookingPageProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const services = db.getServices();
  const stylists = db.getStylists();
  
  const preSelectedServiceId = location.state?.preSelectedService || '';

  const [formData, setFormData] = useState({
    serviceId: preSelectedServiceId,
    stylistId: '',
    date: '',
    time: ''
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.date && formData.stylistId) {
      const stylist = stylists.find(s => s.id === formData.stylistId);
      if (!stylist) return;

      const slots: string[] = [];
      const [startHour] = stylist.startTime.split(':').map(Number);
      const [endHour] = stylist.endTime.split(':').map(Number);

      const appointments = db.getAppointments();
      const bookedTimes = appointments
        .filter(a => a.date === formData.date && a.stylistId === formData.stylistId && a.status !== AppointmentStatus.CANCELLED)
        .map(a => a.time);

      for (let hour = startHour; hour < endHour; hour++) {
        const time1 = `${hour.toString().padStart(2, '0')}:00`;
        const time2 = `${hour.toString().padStart(2, '0')}:30`;
        if (!bookedTimes.includes(time1)) slots.push(time1);
        if (!bookedTimes.includes(time2)) slots.push(time2);
      }
      setAvailableSlots(slots);
    }
  }, [formData.date, formData.stylistId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.serviceId || !formData.stylistId || !formData.date || !formData.time) {
      setError('Please finalize all booking options.');
      return;
    }

    const appointments = db.getAppointments();
    const isAlreadyBooked = appointments.some(a => 
      a.date === formData.date && 
      a.time === formData.time && 
      a.stylistId === formData.stylistId &&
      a.status !== AppointmentStatus.CANCELLED
    );

    if (isAlreadyBooked) {
      setError('Slot unavailable. Please pick another time.');
      return;
    }

    setIsSubmitting(true);

    const selectedService = services.find(s => s.id === formData.serviceId);
    const selectedStylist = stylists.find(s => s.id === formData.stylistId);

    // Prepare payload for Formspree
    const payload = {
      "Customer Name": user.fullName,
      "Email": user.email,
      "Phone": user.phone,
      "Service": selectedService?.name,
      "Price": `INR ${selectedService?.price}`,
      "Stylist": selectedStylist?.name,
      "Date": formData.date,
      "Time": formData.time,
      "Booking Reference": Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    try {
      const response = await fetch("https://formspree.io/f/mqedkpgv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Save locally for dashboard view
        const newAppointment: Appointment = {
          id: payload["Booking Reference"],
          userId: user.id,
          userName: user.fullName,
          serviceId: formData.serviceId,
          stylistId: formData.stylistId,
          date: formData.date,
          time: formData.time,
          status: AppointmentStatus.PENDING,
          createdAt: new Date().toISOString()
        };

        db.saveAppointments([...appointments, newAppointment]);
        setSuccess('Appointment details submitted successfully! Redirecting...');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2500);
      } else {
        const data = await response.json();
        setError(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('A connection error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="md:flex">
            {/* Left Info Panel */}
            <div className="md:w-[350px] bg-slate-950 p-12 text-white">
              <h2 className="text-3xl font-bold mb-10">Your Order</h2>
              <div className="space-y-10">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4 mt-1"><i className="fa-solid fa-user-circle"></i></div>
                  <div>
                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Customer</h4>
                    <p className="text-lg font-medium">{user.fullName}</p>
                  </div>
                </div>
                {selectedService ? (
                  <div className="animate-fadeIn">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mr-4 mt-1 text-amber-500"><i className="fa-solid fa-scissors"></i></div>
                      <div>
                        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Service</h4>
                        <p className="text-lg font-medium">{selectedService.name}</p>
                        <p className="text-amber-500 font-bold mt-2 text-2xl">₹{selectedService.price}</p>
                        <p className="text-slate-400 text-sm mt-1">{selectedService.duration} Minutes Session</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl italic text-slate-400 text-sm">
                    Select a service to see details.
                  </div>
                )}
                <div className="pt-10 border-t border-white/10">
                   <p className="text-slate-500 text-xs leading-relaxed italic">
                     By booking, you agree to our terms. Your details will be submitted for confirmation.
                   </p>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-grow p-12 md:p-16">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-slate-900">Secure Your Slot</h2>
                <p className="text-slate-500 mt-2">Pick your preferred specialist and timing.</p>
              </div>
              
              {error && <div className="bg-red-50 text-red-600 p-5 rounded-2xl mb-8 border border-red-100 flex items-center"><i className="fa-solid fa-circle-exclamation mr-3"></i> {error}</div>}
              {success && <div className="bg-green-50 text-green-600 p-5 rounded-2xl mb-8 border border-green-100 flex items-center"><i className="fa-solid fa-circle-check mr-3"></i> {success}</div>}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">What service are you looking for?</label>
                    <div className="relative">
                      <select 
                        disabled={isSubmitting}
                        value={formData.serviceId}
                        onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                        className="w-full pl-5 pr-10 py-4 rounded-2xl border-2 border-slate-100 focus:border-amber-500 focus:outline-none transition-all bg-slate-50 text-slate-900 font-medium appearance-none disabled:opacity-50"
                      >
                        <option value="">Select a treatment...</option>
                        {services.map(s => <option key={s.id} value={s.id}>{s.name} (₹{s.price})</option>)}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Preferred Specialist</label>
                    <div className="relative">
                      <select 
                        disabled={isSubmitting}
                        value={formData.stylistId}
                        onChange={(e) => setFormData({...formData, stylistId: e.target.value, time: ''})}
                        className="w-full pl-5 pr-10 py-4 rounded-2xl border-2 border-slate-100 focus:border-amber-500 focus:outline-none transition-all bg-slate-50 text-slate-900 font-medium appearance-none disabled:opacity-50"
                      >
                        <option value="">Select a stylist...</option>
                        {stylists.map(s => <option key={s.id} value={s.id}>{s.name} ({s.specialization})</option>)}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Appointment Date</label>
                    <input 
                      disabled={isSubmitting}
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value, time: ''})}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-amber-500 focus:outline-none transition-all bg-slate-50 text-slate-900 font-medium disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Select Time Slot</label>
                    <div className="relative">
                      <select 
                        disabled={isSubmitting || !formData.date || !formData.stylistId}
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full pl-5 pr-10 py-4 rounded-2xl border-2 border-slate-100 focus:border-amber-500 focus:outline-none transition-all bg-slate-50 text-slate-900 font-medium appearance-none disabled:opacity-50"
                      >
                        <option value="">{!formData.date ? 'Select date first' : 'Choose time...'}</option>
                        {availableSlots.map(time => <option key={time} value={time}>{time}</option>)}
                      </select>
                      <i className="fa-solid fa-clock absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-slate-950 text-white py-5 rounded-[2rem] font-bold text-xl hover:bg-amber-600 transition-all shadow-xl hover:shadow-amber-500/20 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><i className="fa-solid fa-circle-notch fa-spin mr-3"></i> Processing...</>
                    ) : (
                      <>Confirm Appointment <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
