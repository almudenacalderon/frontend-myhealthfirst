import api from "./api"
import { Training } from "@/interfaces/ITraining";


export async function GetTrainings(): Promise<Training[]> {
    const { data } = await api.get<Training[]>("Training");
    return data;
}
export async function ObtenerTraining(id: number): Promise<Training> {
    const { data } = await api.get<Training>(`Training/${id}`);
    return data;
}
export async function TrainingPost(
    clientId: number,
    trainerId: number,
    exercises: number[],
    nombre?: string,
    comentarios?: string,
  ): Promise<number> {
    const { data } = await api.post("Training",  {
        clientId,
        trainerId,
        nombre,
        exercises,
        comentarios
    });
    console.log(data)
    return data;
  }

export async function EditarTraining(
  id: number,
  clientId: number,
  exercises: number[],
  nombre?: string,
  comentarios?: string,
): Promise<number> {
    const { data } = await api.put(`Training/${id}`, {
        clientId,
        exercises,
        nombre,
        comentarios
    }); 
    return data;
}
export async function EliminarEntreno(id: number): Promise<void> {
    await api.delete(`Training/${id}`);
}