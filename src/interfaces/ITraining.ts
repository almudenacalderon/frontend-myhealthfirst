import { Exercise } from "./IExercise";

export interface Training {
    id: number,
    nombre?: string,
    exercises: Exercise[],
    comentarios?: string,
    clientId: number,
    trainerId: number,
}