
import { User, Service, Stylist, Appointment, UserRole, Gender, AppointmentStatus } from './types';

const STORAGE_KEYS = {
  USERS: 'salon_users',
  SERVICES: 'salon_services',
  STYLISTS: 'salon_stylists',
  APPOINTMENTS: 'salon_appointments',
  CURRENT_USER: 'salon_current_user'
};

const DEFAULT_SERVICES: Service[] = [
  { 
    id: '1', 
    name: 'Precision Haircut', 
    price: 599, 
    duration: 45, 
    description: 'Expert scissors and clipper work for a sharp, modern look tailored to your personality.',
    image: 'https://images.unsplash.com/photo-1599351431247-f5793384797d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '2', 
    name: 'Royal Beard Sculpture', 
    price: 349, 
    duration: 30, 
    description: 'Complete beard grooming with straight razor edging and premium sandalwood oil finish.',
    image: 'https://images.unsplash.com/photo-1621605815841-aa88c82b028c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '3', 
    name: 'Skin Revival Facial', 
    price: 1499, 
    duration: 60, 
    description: 'Deep cleansing and hydration treatment using luxury organic extracts for a glowing complexion.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '4', 
    name: 'Elite Hair Spa', 
    price: 1899, 
    duration: 75, 
    description: 'Intensive scalp therapy and steam treatment to repair damage and promote healthy growth.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '5', 
    name: 'Artistic Color', 
    price: 2999, 
    duration: 120, 
    description: 'Full dimensional color or balayage service using premium Italian ammonia-free dyes.',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '6', 
    name: 'Event Styling', 
    price: 899, 
    duration: 45, 
    description: 'Red-carpet ready blowouts and intricate up-dos for your most special occasions.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  },
];

const DEFAULT_STYLISTS: Stylist[] = [
  { id: '1', name: 'Arjun Verma', specialization: 'Master Stylist & Barber', startTime: '09:00', endTime: '20:00' },
  { id: '2', name: 'Priya Sharma', specialization: 'Color & Spa Expert', startTime: '10:00', endTime: '19:00' },
  { id: '3', name: 'Vikram Singh', specialization: 'Beard & Skin Specialist', startTime: '09:00', endTime: '18:00' },
];

const DEFAULT_USERS: User[] = [
  { id: 'admin-1', fullName: 'Glow Admin', email: 'admin@glowgo.com', password: 'admin', phone: '+91 7738839027', gender: Gender.OTHER, role: UserRole.ADMIN },
  { id: 'user-1', fullName: 'Rahul Khanna', email: 'rahul@example.com', password: 'password', phone: '9876543210', gender: Gender.MALE, role: UserRole.USER },
];

export const db = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STYLISTS)) {
      localStorage.setItem(STORAGE_KEYS.STYLISTS, JSON.stringify(DEFAULT_STYLISTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify([]));
    }
  },

  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUsers: (users: User[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)),

  getServices: (): Service[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || '[]'),
  saveServices: (services: Service[]) => localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)),

  getStylists: (): Stylist[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.STYLISTS) || '[]'),
  saveStylists: (stylists: Stylist[]) => localStorage.setItem(STORAGE_KEYS.STYLISTS, JSON.stringify(stylists)),

  getAppointments: (): Appointment[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]'),
  saveAppointments: (appointments: Appointment[]) => localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments)),

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};
