import UserDashboard from "./components/UsersDashboard"
 import { GET } from "@/app/api/dashboard/route"
import { type Users } from "@/app/types/user"
export default async function page() {

    const users: Users = await (await GET()).json()
    //const res = await GET()
    // const users: Users = await res.json()

    return (
       
         <UserDashboard users={users} />
    )
}
