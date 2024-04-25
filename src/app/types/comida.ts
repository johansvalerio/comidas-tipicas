
export type Comidas = Comida[]

export interface Comida {
    comida_id: number,
    comida_name: string,
    comida_price: number,
    comida_description: string,
    comida_created_on: Date,
    comida_updated_at: Date
}

