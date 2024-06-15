import { NextResponse } from "next/server";
import  db from "@/libs/db";

export async function GET() {
    
    const users = await db.users.findMany(
        {
            include: {
                user_role: {
                    include: {
                        role: true
                    }
                }
            }
        }
    );
    //console.log(JSON.stringify(users))
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    try {
        const { value } = await request.json();
        console.log(value);

        // Busca usuarios por su nombre
        const userByName = await db.users.findMany({  //USAR FINDMANY PARA HACER BUSSQUEDAS AUTOMÁTICAS
            where: {
                user_name: {
                    contains: value // Usa 'contains' en lugar de 'startsWith' y 'endsWith'
                }
            }
        });

        console.log(userByName);

        if (userByName) {
            return NextResponse.json(userByName)
            
        } else {
            // Si no se encuentra por nombre, intenta buscar por ID
            const userById = await db.users.findFirst({
                where: {
                    user_id: parseInt(value) // Parsea el nombre de usuario a un número
                }
            });

            if (userById) {
                return NextResponse.json(userById);
            } else {
                // Si no se encuentra ningún usuario, devuelve un mensaje de error
                return NextResponse.json({ error: "Error al buscar usuario" }, { status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al buscar usuario" }, { status: 500 });
    }
}