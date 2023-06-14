import api from "./api"
import { Diet } from "@/interfaces/IDiet";


export async function GetDiets(): Promise<Diet[]> {
    const { data } = await api.get<Diet[]>("Diet");
    return data;
}
export async function ObtenerDieta(id: number): Promise<Diet> {
    const { data } = await api.get<Diet>(`Diet/${id}`);
    return data;
}
export async function DietPost(
    clientId: number,
    nutricionistId: number,
    nombre: string,
    comentarios?: string,
  ): Promise<number> {
    const { data } = await api.post(`Diet/${nutricionistId}`,  {
        clientId,
        nombre,
        comentarios
    });
    return data;
  }

export async function EditarDieta(
  clientId: number,
  id: number,
  nombre: string,
  comentarios?: string,
): Promise<number> {
    const { data } = await api.put(`Diet/${id}`, {
        clientId,
        nombre,
        comentarios
    }); 
    return data;
}
export async function EliminarDieta(id: number): Promise<void> {
    await api.delete(`Diet/${id}`);
}