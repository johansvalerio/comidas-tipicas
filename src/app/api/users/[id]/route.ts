import { NextResponse } from "next/server";
import db from "@/libs/db";
import { type User } from "@/app/types/user";

interface Params {
    params: {
        id: string
    }
}
// Métodos específicos de los usuarios
// Método para buscar usuario por nombre y por id
// segundo código

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
            return NextResponse.json(userByName);
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


export async function SEARCH({ params }: Params) {
    console.log("Getting user..." + params.id)
    const notSplit = params.id.replace(" ", "").replace("%20",  "")
    console.log(notSplit)
    const userByName = await db.users.findFirst({
        where: {
            user_name: {
                contains: notSplit
            }
        }
    })

    if (userByName) {
        return NextResponse.json(userByName);
    } else {
         const userById = await db.users.findFirst({
        where: {
            user_id: Number(params.id)
        }
    })
    return NextResponse.json(userById);
     }
}

//Api user data method by id
export async function GET(request: Request, { params }: Params) {


    console.log("Getting user..." + params.id)
    const notSplit = params.id
    console.log(notSplit)
    const userByName = await db.users.findFirst({
        where: {
            user_name: {
                contains: notSplit
            }
        }
    })

    if (userByName) {
        return NextResponse.json(userByName);
    } else {
         const userById = await db.users.findFirst({
        where: {
            user_id: Number(params.id)
        }
    })
    return NextResponse.json(userById);
    }
}
//[Método delete user by id]
export async function DELETE(request: Request, { params }: Params) {
    const data: User = await request.json()
    console.log("Deleting user_id: ", data.user_id)
    const userDeleted = await db.users.delete({
        where: {
            user_id: Number(data.user_id)
        }
    })
    console.log("Deleted user: ", JSON.stringify(userDeleted))
    return NextResponse.json(userDeleted);
}

//[[Método update user by id]]
export async function PUT(request: Request, { params }: Params) {
    const data: User = await request.json()
    console.log("Updating user_id: " + params.id)
    const userUpdated = await db.users.update({
        data,
        where: {
            user_id: Number(params.id)
        }
    })
    console.log("User updated: " + JSON.stringify(userUpdated));
    return NextResponse.json(userUpdated);
}

