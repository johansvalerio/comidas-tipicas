import { type Orders } from "@/app/types/order"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function OrderList({ orders }: { orders: Orders }) {

    const session = await getServerSession(authOptions)

    return (
        <div className="grid grid-cols-4 gap-5">
            {
                orders.map((order) => (
                    order.user.user_email === session?.user?.email &&
                    <div key={order.order_id} className="w-full">
                       
                            <p>Id orden: {order.order_id}</p>
                            <p>Producto: {order.comida.comida_name}</p>
                            <p>Precio: {order.comida.comida_price}</p>
                            <p>Cantidad: {order.order_quantity}</p>
                            <p>Total: {order.order_total}</p>
                       
                            <p>Usuario: {order.user.user_name}</p>
                            <p>Dirección: {order.order_address}</p>
                            <p>Comentarios: {order.order_comment}</p>
                            <p>Status: {order.order_status}</p>

                            <hr />
                        
                    </div>
                   
                ))
            }
            
        </div>
    )
}
