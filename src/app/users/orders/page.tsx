import OrderList from "./components/OrderList"
import {GET} from "@/app/api/orders/route"
import { type Orders } from "@/app/types/order"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
export default async function page() {

    const data = await GET()
    const orders: Orders = await data.json()
    
    const session = await getServerSession(authOptions)

  return (
    <div className="p-24 bg-zinc-950">
      <OrderList orders={orders} session={session}/>
    </div>
  )
}
