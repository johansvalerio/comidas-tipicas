// import { type User, type Users } from "@/app/types/user"
import { type Users } from "@/app/types/user"
// import { GET } from "@/app/api/dashboard/route"
// import { POST as deleteUser } from "@/app/api/dashboard/route"

// async function getUsers() {
//   const res = await GET()
//   const users: Users = await res.json()
//   return users
//   console.log(users)
// }
export default async function UserDashboard({users}: {users: Users}) {
  let count = 0
  // const users: Users = await getUsers()

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <ul>
        {
          users.map((user) => (
            count += 1,
            <li key={user.user_id}>
              <div className="flex gap-2">

                <p>{count}.</p>

                <div>
                  <p>{user.user_name}</p>
                  <p>{user.user_email}</p>
                  <p>{user.user_password}</p>
                  <p>{user.user_created_on.toString()}</p>
                  <p>{user.user_updated_at.toString()}</p>
                  <button
                    
                    className="bg-red-500 p-2.5 text-sm font-medium rounded-full">Delete</button>
                  <hr className="my-2" />
                </div>

              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
