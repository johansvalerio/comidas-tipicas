"use client";
import { type Orders, type Order } from "@/app/types/order";
import { type Session } from "next-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderList({ orders, session }: { orders: Orders, session: Session | null }) {

    const [status, setStatus] = useState('');
    const [updStatus, setUpdStatus] = useState(false);
    const [id, setId] = useState(0);
    const router = useRouter();

    const handleEditButton = (order: Order) => {
        setUpdStatus(true);
        if (updStatus === true && id === order.order_id) {
            setUpdStatus(false);
        }
        if (updStatus === true && id !== order.order_id) {
            setUpdStatus(true);
        }
    };

    const handlePatchStatus = async (order_id: number, status: string) => {
        setStatus(status);
        console.log(status);
        console.log(order_id);
        const res = await fetch(`/api/orders`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: order_id,
                order_status: status
            }),
        });

        const newStatus = await res.json();
        console.log(newStatus);
        router.refresh();
        setUpdStatus(false);
    };

    // Función para formatear la hora
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        let hours: string | number = date.getHours();
        let minutes: string | number = date.getMinutes();
        let seconds: string | number = date.getSeconds();
        let AMPM = hours >= 12 ? 'PM' : 'AM';

        // Asegurarse de que las horas, minutos y segundos tengan dos dígitos
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        //devolvemos el día, mes, año, hora, minuto y segundo
        return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()} - 
        ${hours}:${minutes}:${seconds} ${AMPM}`;
    };

    // Función para calcular el tiempo transcurrido
    const timeSince = (dateString: string) => {
        const date = new Date(dateString); //HORA DEL PEDIDO
        const now = new Date(); //HORA ACTUAL
        //restamoos el tiempo actual al tiempo del pedido
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return ` ${interval} horas`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return ` ${interval} minutos`;
        }
        return `${Math.floor(seconds)} segundos`;
    };

    return (
        <div>
            {session?.user?.role === 1 ?
                <h1 className="text-3xl font-bold text-white pb-8 flex items-baseline gap-3">Todos los pedidos <span className="text-zinc-400 text-2xl">( {orders.length} )</span></h1>
                :
                <h1 className="text-3xl font-bold text-white pb-8 flex items-baseline gap-3">Mis pedidos 
                <span className="text-zinc-400 text-2xl">( {orders.filter((order) => order.user.user_email === session?.user?.email).length} )</span>  
                </h1>
            }
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
                {
                    orders.map((order) => (
                        (session?.user?.role === 1 || order.user.user_email === session?.user?.email) &&

                        <div key={order.order_id}
                            className={`w-full bg-zinc-900 border-4 p-4 text-zinc-400 font-medium
                              ${order.order_status === "Entregado" && "border-green-600 " ||
                                order.order_status === "En proceso" && "border-yellow-600" ||
                                order.order_status === "Cancelado" && "border-red-600" ||
                                order.order_status === "Pendiente" && "border-blue-600 bg-blue-300"}`}>

                            {session?.user?.role === 1 &&
                                <p>Id orden: {order.order_id}</p>}
                            {session?.user?.role === 1 && <p className="flex gap-1">Usuario: <a className="capitalize">{order.user.user_name}</a></p>}
                            <p>Producto: {order.comida.comida_name}</p>
                            <p>Precio: ₡ {order.comida.comida_price}</p>
                            <p>Cantidad: {order.order_quantity}</p>
                            <p>Total: {order.order_total}</p>
                            {session?.user?.role === 1
                                && order.user.user_role && <p>Role: {order.user.user_role?.role?.role_name}</p>}
                            <p>Entregar en: {order.order_address}</p>
                            <p>Comentarios: {order.order_comment}</p>
                            <p>Hace: {timeSince(order.order_created_on.toString())}</p>
                            {session?.user?.role === 1
                                && <p>Creado el: {formatTime(order.order_created_on.toString())}</p>}

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
                                    :
                                    <p className="flex items-center">Status:
                                        <select className="mx-1 bg-zinc-800 p-1 rounded text-white" onChange={(e) => setStatus(e.target.value)} defaultValue={order.order_status} name="status">
                                            <option value="" disabled>--Estado de la orden--</option>
                                            <option className=" text-yellow-500 font-medium" value="En proceso">En proceso</option>
                                            <option className="text-green-500 font-medium" value="Entregado">Entregado</option>
                                            <option className="text-red-500 font-medium" value="Cancelado">Cancelado</option>
                                            <option className="text-blue-500 font-medium" value="Pendiente">Pendiente</option>
                                        </select>
                                    </p>
                            }

                            {
                                session?.user?.role === 1 &&
                                <div className="flex gap-2 my-2">
                                    <button className={` text-white font-semibold border-white p-1.5  rounded ${updStatus === true && id === order.order_id ? "bg-red-600 hover:bg-red-500" : "bg-stone-600 hover:bg-stone-500 "}`}
                                        onClick={() => {
                                            handleEditButton(order),
                                                setId(order.order_id)

                                        }}>
                                        {updStatus === true && id === order.order_id ? "Cancelar" : "Actualizar"}
                                    </button>
                                    {updStatus === true && id === order.order_id
                                        &&
                                        <button className="bg-green-600 hover:bg-green-500 text-white font-bold p-1  rounded"
                                            onClick={
                                                () => handlePatchStatus(order.order_id, status)
                                            }>Guardar
                                        </button>}
                                </div>
                            }
                        </div>

                    )).reverse()

                }

            </div>
        </div>
    )
}
