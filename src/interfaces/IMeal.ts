export interface Meal {
    id: number,
    nombre?: string,
    desayuno?: string
    comida?: string
    media_mañana?: string
    cena?: string
    merienda?: string
    otros?: string
    post_entreno?: string
    pre_entreno?: string
    dietId: number
    comentarios?: string
}