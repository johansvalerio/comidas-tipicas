import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"
import db from "@/libs/db"
import { Users } from "@/app/types/user"

async function MiPerfil() {
    const session = await getServerSession(authOptions)
    let users: Users = []

    if (session) {

        const currentUser = await db.users.findUnique({
            where: {
                user_email: session?.user?.email as string // Suponiendo que user_email es el identificador único del usuario
            },
            include: {
                user_role: {
                    include: {
                        role: true
                    }
                }
            }
        })

        //Si hay session Cargamos el usuario actual al arreglo users[] que será mapeado en el componente
        if (currentUser) {
            users.push(currentUser)
        //Si no hay session cargamos todos los usuarios al arreglo users[] que será mapeado en el componente
        }else{
            users = await db.users.findMany()
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            
            {users.map((user) => (
                <div key={user.user_id}>
                    <h1>Mi Perfil</h1>
                {session?.user?.email === user.user_email 
                ? <div>
                    <p className="flex gap-1">Current user: <p className="capitalize">{user.user_name}</p></p>
                    <p>Email: {user.user_email}</p>
                    {
                        session?.user?.role === 1 && <p>Role: {user.user_role?.role?.role_name}</p>}
                    <p>Created on: {user.user_created_on.toString()}</p>
                </div>
                    : <p>{user.user_name}</p>
                }
                </div>
            ))}
        </div>
    )
}

export default MiPerfil