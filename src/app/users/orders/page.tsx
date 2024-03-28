import OrderList from "./components/OrderList"
import {GET} from "@/app/api/orders/route"
import { type Orders } from "@/app/types/order"
export default async function page() {

    const data = await GET()
    const orders: Orders = await data.json()
    

  return (
    <div className="w-full h-screen flex justify-center p-24">
      <OrderList orders={orders}/>
    </div>
  )
}
