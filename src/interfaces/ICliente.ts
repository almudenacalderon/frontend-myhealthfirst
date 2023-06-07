export interface Cliente {
  id: number;
  nombre: string;
  phoneNumber?: string;
  email: string;
  peso?: number;
  altura?: number;
  fechaNacimiento?: Date;
  fecha_asignacion_dieta?: Date;
  fecha_asignacion_entrenamiento?: Date;
  trainerId?: number;
  nutricionistId?: number;
  role: string;
}