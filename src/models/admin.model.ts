// src/models/admin.model.ts
export interface Admin {
    id: number;
    username: string;
    email: string;
    password: string;
  }
  
  export const admins: Admin[] = [
    { id: 1, username: 'admin', email: 'syailendrawicaksono29@example.com', password: 'Inisandi123' }
  ];  