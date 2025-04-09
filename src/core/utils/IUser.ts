export interface User {
    id?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    token?: string; 
    photo?: string;
    gender?: "male" | "female" | "other"; 
    phoneNumber?: string;
    birthDate?: string; 
    city?: string;
    district?: string;
    active?: boolean;
    emailVerified?: boolean;
    createdAt?: string; 
    updatedAt?: string; 
  }