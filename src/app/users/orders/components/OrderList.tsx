"use client"
import { type Orders, type Order } from "@/app/types/order"
import { type Session } from "next-auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function OrderList({ orders, session }: { orders: Orders, session: Session | null }) {

    const [status, setStatus] = useState('')
    const [updStatus, setUpdStatus] = useState(false)
    const [id, setId] = useState(0)
    const router = useRouter()

    const roles = {
        'Admin': 'Admin',
        'Cliente': 'Cliente'
    }

    const handleEditButton = (order: Order) => {
        setUpdStatus(true)
        if (updStatus === true && id === order.order_id) {
            setUpdStatus(false)
        }
        if (updStatus === true && id !== order.order_id) {
            setUpdStatus(true)
        }
    }
    const handlePatchStatus = async (order: Order, status: string) => {
        setStatus(status)
        console.log(status)
        const res = await fetch(`/api/orders`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: order.order_id,
                order_status: status
            }),

        })

        const newStatus = await res.json()
        console.log(newStatus)
        router.refresh()

        setUpdStatus(false)
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white pb-8">Mis ordenes</h1>
            <div className="grid grid-cols-4 gap-5">
                {
                    orders.map((order) => (
                        order.user.user_role?.role?.role_id !== 1 || order.user.user_email === session?.user?.email
                         ? <div key={order.order_id}
                                className={`w-full bg-zinc-900 border-4 p-4 text-zinc-400 font-medium
                                  ${order.order_status === "Entregado" && "border-green-600 " ||
                                    order.order_status === "En proceso" && "border-yellow-600" ||
                                    order.order_status === "Cancelado" && "border-red-600" ||
                                    order.order_status === "Pendiente" && "border-blue-600 bg-blue-300"}`}>

                                <p>Id orden: {order.order_id}</p>
                                <p>Producto: {order.comida.comida_name}</p>
                                <p>Precio: {order.comida.comida_price}</p>
                                <p>Cantidad: {order.order_quantity}</p>
                                <p>Total: {order.order_total}</p>
                                {
                                    order.user.user_role?.role?.role_id === 1 && <p>Role: {roles.Admin} </p> ||
                                    order.user.user_role?.role?.role_id === 2 && <p>Role: {roles.Cliente} </p> ||
                                    <p>Role: No role</p>
                                }
                                <p>Usuario: {order.user.user_name}</p>
                                <p>Dirección: {order.order_address}</p>
                                <p>Comentarios: {order.order_comment}</p>

                                {
                                    updStatus === false || id !== order.order_id ?
                                        <p className={` font-bold
                                        ${order.order_status === "En proceso" && "text-yellow-500" ||
                                            order.order_status === "Entregado" && "text-green-500" ||
                                            order.order_status === "Cancelado" && "text-red-500" ||
                                            order.order_status === "Pendiente" && "text-blue-500"
                                            }`}>
                                            Status: {order.order_status}
                                        </p>
                                        : <p>Status:
                                            <select className="mx-2 bg-zinc-800 text-white" onChange={(e) => setStatus(e.target.value)} defaultValue={order.order_status} name="status">
                                                <option value="" disabled>--Estado de la orden--</option>
                                                <option className=" text-yellow-500" value="En proceso">En proceso</option>
                                                <option className="text-green-500" value="Entregado">Entregado</option>
                                                <option className="text-red-500" value="Cancelado">Cancelado</option>
                                                <option className="text-blue-500" value="Pendiente">Pendiente</option>
                                            </select>
                                        </p>
                                }

                                {
                                    session?.user?.email === "johans-vb@live.com" &&
                                    <div className="flex gap-2 my-2">
                                        <button className={` text-white font-bold p-1  rounded ${updStatus === true && id === order.order_id ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                                            onClick={() => {
                                                handleEditButton(order),
                                                    setId(order.order_id)

                                            }}>
                                            {updStatus === true && id === order.order_id ? "Cancelar" : "Actualizar"}
                                        </button>
                                        {updStatus === true && id === order.order_id
                                            &&
                                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold p-1  rounded"
                                                onClick={
                                                    () => handlePatchStatus(order, status)
                                                }>Guardar
                                            </button>}
                                    </div>
                                }
                            </div> : null

                    )).reverse()

                }

            </div>
        </div>
    )
}
