import api from "./api"
import type { Nutricionista } from "../interfaces/INutricionista"

export async function GetNutricionists(): Promise<Nutricionista[]> {
    const { data } = await api.get<Nutricionista[]>("Nutricionist");
    return data;
}
export async function ObtenerNutricionista(id: number): Promise<Nutricionista> {
    const { data } = await api.get<Nutricionista>(`Nutricionist/${id}`);
    return data;
}

export async function EditarNutricionist(
  id: number,
  nombre: string,
  email: string,
  phoneNumber?: string,
  fechaNacimiento?: Date
): Promise<number> {
    const { data } = await api.put(`Nutricionist/${id}`, {
        nombre,
        email,
        phoneNumber,
        fechaNacimiento,
    }); 
    return data;
}
export async function EliminarNutricionist(id: number): Promise<void> {
    await api.delete(`Nutricionist/${id}`);
}