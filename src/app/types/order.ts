import { User } from "./user"
import { Comida } from "./comida"

export type Orders = Order[]

export interface Order {
    order_id: number,
    order_quantity: number,
    order_address: string,
    order_comment: string,
    order_status: string,
    order_total: number,
    user_id: number,
    comida_id: number
 
    user : User,
    comida: Comida
}