export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'alta' | 'media' | 'baja';
  status: 'pendiente' | 'en-progreso' | 'completada';
  flagged: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Reminder {
  id: number;
  taskId: number;
  message: string;
  reminderDate: Date;
  isActive: boolean;
}

export interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  reminderTime: number; // minutes before due date
  language: 'es' | 'en';
}