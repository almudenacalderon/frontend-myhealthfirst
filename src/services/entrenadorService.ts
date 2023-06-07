import api from "./api"
import type { Entrenador } from "../interfaces/IEntrenador"

export async function GetTrainers(): Promise<Entrenador[]> {
    const { data } = await api.get<Entrenador[]>("Trainer");
    return data;
}
export async function ObtenerTrainer(id: number): Promise<Entrenador> {
    const { data } = await api.get<Entrenador>(`Trainer/${id}`);
    return data;
}

export async function EditarTrainer(
  id: number,
  nombre: string,
  email: string,
  phoneNumber?: string,
  fechaNacimiento?: Date
): Promise<number> {
    const { data } = await api.put(`Trainer/${id}`, {
        nombre,
        email,
        phoneNumber,
        fechaNacimiento,
    }); 
    return data;
}
export async function EliminarEntrenador(id: number): Promise<void> {
    await api.delete(`Trainer/${id}`);
}