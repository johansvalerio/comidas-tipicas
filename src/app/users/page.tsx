import ListUser from "./components/ListUser"
import { GET } from "@/app/api/users/route"
import { type Users } from "@/app/types/user"
export default async function page() {

    
    const res = await GET()
    const users: Users = await res.json()

    return (

        <ListUser users={users} />
    )
}
