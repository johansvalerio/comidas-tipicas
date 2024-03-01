import { NextResponse } from "next/server";
import db from "@/libs/db";
import { type Users, type User } from "@/app/types/user";

export async function GET() {
    const users: Users = await db.users.findMany();
    console.log(JSON.stringify(users))
    return NextResponse.json(users);
}
// export const getAllUsers = GET()

export async function POST({id}: { id: number }) {
    const deleteUser: User = await db.users.delete({
        where: {
            user_id: id
        }
    })
    console.log("User deleted: " + JSON.stringify(deleteUser));
    return NextResponse.json(deleteUser);
}