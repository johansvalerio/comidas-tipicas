import { NextResponse } from "next/server";
import db from "@/libs/db";
import { type User } from "@/app/types/user";

interface Params {
    params: {
        id: string
    }
}
// Métodos específicos de los usuarios
// [Método get user by id]
export async function getDomUsers({params }: Params) {
    console.log("Getting user..." + params.id)
    const user = await db.users.findFirst({
        where: {
            user_id: Number(params.id)
        }
    })
    console.log("Got user: " + JSON.stringify(user))
    return NextResponse.json(user);
}
//Api user data method by id
export async function GET(request: Request, {params }: Params) {
    console.log("Getting user..." + params.id)
    const user = await db.users.findFirst({
        where: {
            user_id: Number(params.id)
        }
    })
    console.log("Got user: " + JSON.stringify(user))
    return NextResponse.json(user);
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
export async function PUT(request: Request , { params }: Params) {
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
