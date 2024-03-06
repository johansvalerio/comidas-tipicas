import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import db from "@/libs/db"
import { Users } from "@/app/types/user"

async function MiPerfil() {
    const session = await getServerSession(authOptions)
    let users: Users = []

    if (session) {
        
        const currentUser = await db.users.findUnique({
            where: {
                user_email: session?.user?.email as string // Suponiendo que user_email es el identificador único del usuario
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
        <div className="w-full h-screen flex flex-col items-center">
            <h1>Mi Perfil</h1>
            {users.map((user) => (
                <div key={user.user_id}>
                {session?.user?.name === user.user_name ? <p>Current: {user.user_name}</p>
                    : <p>{user.user_name}</p>
                }
                </div>
            ))}
        </div>
    )
}

export default MiPerfil
