import { NextResponse } from "next/server";
import db from "@/libs/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession, type Session } from "next-auth";


export async function POST(request: Request) {

    const session: Session | null = await getServerSession(authOptions)

    const user = await db.users.findUnique({
        where: {
            user_name: session?.user?.name as string
        }
    })

    console.log(user)

    const data = await request.json()

    console.log(data)
    console.log(data.comida_id)

    const comida = await db.comidas.findUnique({
        where: {
            comida_id: Number(data.comida_id)
        }
    })

    console.log(comida)

    const precioFinal = Number(comida?.comida_price) * Number(data.order_quantity)

    console.log(`Total price: ${precioFinal}`)

    const newOrder = await db.orders.create({
        data: {
            order_quantity: Number(data.order_quantity),
            order_address: data.order_address,
            order_comment: data.order_comment,
            order_status: "Pendiente",
            user_id: Number(user?.user_id),
            comida_id: Number(data.comida_id),
            order_total: Number(precioFinal)
        }
    })

    return NextResponse.json(newOrder)
}

export async function GET() {

    const orders = await db.orders.findMany({
        include: {
            user: {
                include: {
                    user_role: {
                        include: {
                            role: true
                        }
                    }
                }
            },
            comida: true
        }
    })

    return NextResponse.json(orders)
}

export async function PATCH(request: Request) {

    const data = await request.json()
    
    const newOrderStatus = await db.orders.update({
        where: {
            order_id: Number(data.order_id)
        },
        data: {
            order_status: data.order_status
        }
    })

    return NextResponse.json(newOrderStatus)
    
}