/* eslint-disable @next/next/no-img-element */
import { type Orders } from "@/app/types/order"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function OrderList({ orders }: { orders: Orders }) {

    const session = await getServerSession(authOptions)

    return (
        <div>
            <h1 className="text-3xl font-bold text-white pb-8">Mis ordenes</h1>
            <div className="grid grid-cols-4 gap-5">
                {
                    orders.map((order) => (
                        order.user.user_email === session?.user?.email &&
                        <div key={order.order_id}
                            className={`w-full bg-zinc-900 border-4 p-4 text-zinc-600
                              ${order.order_status === "Entregado" && "border-green-600 " ||
                                order.order_status === "En proceso" && "border-yellow-600" ||
                                order.order_status === "Cancelado" && "border-red-600" ||
                                order.order_status === "Pendiente" && "border-blue-600 bg-blue-300"}`}>

                            <p>Id orden: {order.order_id}</p>
                            <p>Producto: {order.comida.comida_name}</p>
                            <p>Precio: {order.comida.comida_price}</p>
                            <p>Cantidad: {order.order_quantity}</p>
                            <p>Total: {order.order_total}</p>

                            <p>Usuario: {order.user.user_name}</p>
                            <p>Dirección: {order.order_address}</p>
                            <p>Comentarios: {order.order_comment}</p>

                            <p className={` font-bold
                            ${order.order_status === "En proceso" && "text-yellow-500" ||
                                order.order_status === "Entregado" && "text-green-500" ||
                                order.order_status === "Cancelado" && "text-red-500" ||
                                order.order_status === "Pendiente" && "text-blue-500"
                            }`}>
                                Status: {order.order_status}
                            </p>

                            

                        </div>

                    )).reverse()
                }

            </div>
        </div>
    )
}
