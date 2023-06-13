import api from "./api"
import { Exercise } from "@/interfaces/IExercise";


export async function GetExercises(): Promise<Exercise[]> {
    const { data } = await api.get<Exercise[]>("Exercise");
    return data;
}
export async function ObtenerExercise(id: number): Promise<Exercise> {
    const { data } = await api.get<Exercise>(`Exercise/${id}`);
    return data;
}
export async function ExercisePost(
    nombre: string,
    set: number,
    repeticiones: number,
    comentarios: string,
  ): Promise<number> {
    const { data } = await api.post("Exercise",  {
        nombre,
        set,
        repeticiones,
        comentarios
    });
    console.log(data)
    return data;
  }

export async function EditarExercise(
    id: number,
    nombre: string,
    set: number,
    repeticiones: number,
    comentarios: string,
): Promise<number> {
    const { data } = await api.put(`Exercise/${id}`, {
        nombre,
        set,
        repeticiones,
        comentarios
    }); 
    return data;
}
export async function EliminarExercise(id: number): Promise<void> {
    await api.delete(`Exercise/${id}`);
}