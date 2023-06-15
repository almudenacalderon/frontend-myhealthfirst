export interface Nutricionista {
    id: number;
    nombre: string;
    userId: string;
    phoneNumber?: string;
    email: string;
    fechaNacimiento?: Date;
    role: string;
  }