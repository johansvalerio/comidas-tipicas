import { NextResponse } from "next/server";
import db from "@/libs/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, type Session } from "next-auth";


export async function POST(request: Request) {

    const session: Session | null = await getServerSession(authOptions)

    const user = await db.users.findUnique({
        where: {
            user_name: session?.user?.name as string
        }
    })

    const data = await request.json()

    const comidaPrecio = await db.comidas.findUnique({
        where: {
            comida_id: Number(data.comida_id)
        }
    })

    const precioFinal = Number(comidaPrecio?.comida_price) * Number(data.order_quantity)


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
            user: true,
            comida: true
        }
    })

    return NextResponse.json(orders)
}