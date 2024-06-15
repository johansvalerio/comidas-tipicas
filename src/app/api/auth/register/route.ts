import { NextResponse } from "next/server";
import db from "@/libs/db";
import { type User } from "@/app/types/user";
export async function POST(request: Request) {
    const data = await request.json();

    const userFoundByEmail = await db.users.findUnique({
        where: {
            user_email: data.user_email
        }
    })

    const userFoundByName = await db.users.findUnique({
        where: {
            user_name: data.user_name
        }
    })

    if (userFoundByEmail) {
        return NextResponse.json({ error: "User email already exists" }, { status: 400 });
    }

    if (userFoundByName) {
        return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    console.log(data);
    const newUser: User = await db.users.create({
        data:{
            user_name: data.user_name.toLowerCase(),
            user_email: data.user_email.toLowerCase(),
            user_password: data.user_password,
            user_role: {
                create: {
                    role_id: 2
                }
            }
        }
    })

    // const roleUser = await db.user_role.create({
    //     data: {
    //         role_id: 2,
    //         user_id: newUser.user_id
    //     }
    // })

     console.log("User created: " + JSON.stringify(newUser));
    // console.log("User role created: " + JSON.stringify(roleUser));
    return NextResponse.json(newUser);
}