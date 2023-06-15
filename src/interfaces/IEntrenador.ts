export interface Entrenador {
  id: number;
  nombre: string;
  userId: string,
  phoneNumber?: string;
  email: string;
  fechaNacimiento?: Date;
  role: string;
}