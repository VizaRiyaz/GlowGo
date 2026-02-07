
export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  specialization: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  gender: Gender;
  role: UserRole;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  stylistId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}
