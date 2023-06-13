import api from "./api"
import type { Cliente } from "../interfaces/ICliente"

export async function GetClientes(): Promise<Cliente[]> {
    const { data } = await api.get<Cliente[]>("Client");
    return data;
}
export async function ObtenerCliente(id: number): Promise<Cliente> {
    const { data } = await api.get<Cliente>(`Client/${id}`);
    return data;
}

export async function EditarCliente(
  id: number,
  nombre: string,
  email: string,
  role: string,
  phoneNumber?: string,
  peso?: number,
  altura?: number,
  fechaNacimiento?: Date,
  fecha_asignacion_dieta?: Date,
  fecha_asignacion_entrenamiento?: Date,
  trainerId?: number,
  nutricionistId?: number,
): Promise<number> {
    const { data } = await api.put(`Client/${id}`, {
        nombre,
        email,
        phoneNumber,
        peso,
        altura,
        fechaNacimiento,
        fecha_asignacion_dieta,
        fecha_asignacion_entrenamiento,
        trainerId,
        nutricionistId,
        role
    }); 
    return data;
}
export async function EliminarCliente(id: number): Promise<void> {
    await api.delete(`Client/${id}`);
}