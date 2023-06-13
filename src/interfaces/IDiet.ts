import { Meal } from "./IMeal";

export interface Diet {
    id: number,
    nombre: string,
    meals: Meal [],
    nutricionistId: number,
    comentarios?: string,
    clientId: number,
}