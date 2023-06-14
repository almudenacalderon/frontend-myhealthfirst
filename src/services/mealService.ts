import api from "./api"
import { Meal } from "@/interfaces/IMeal";


export async function GetMeals(): Promise<Meal[]> {
    const { data } = await api.get<Meal[]>("Meal");
    return data;
}
export async function ObtenerMeal(id: number): Promise<Meal> {
    const { data } = await api.get<Meal>(`Meal/${id}`);
    return data;
}
export async function MealPost(
    dietId: number,
    nombre?: string,
    desayuno?: string,
    comida?: string,
    media_mañana?: string,
    cena?: string,
    merienda?: string,
    otros?: string,
    post_entreno?: string,
    pre_entreno?: string,
    comentarios?: string,
): Promise<number> {
    const { data } = await api.post("Meal", {
        dietId,
        nombre,
        desayuno,
        comida,
        media_mañana,
        cena,
        merienda,
        otros,
        post_entreno,
        pre_entreno,
        comentarios
    });
    console.log(data)
    return data;
}

export async function EditarMeal(
    id: number,
    dietId: number,
    nombre?: string,
    desayuno?: string,
    comida?: string,
    media_mañana?: string,
    cena?: string,
    merienda?: string,
    otros?: string,
    post_entreno?: string,
    pre_entreno?: string,
    comentarios?: string,
): Promise<number> {
    const { data } = await api.put(`Meal/${id}`, {
        dietId,
        nombre,
        desayuno,
        comida,
        media_mañana,
        cena,
        merienda,
        otros,
        post_entreno,
        pre_entreno,
        comentarios
    });
    return data;
}
export async function EliminarMeal(id: number): Promise<void> {
    await api.delete(`Meal/${id}`);
}