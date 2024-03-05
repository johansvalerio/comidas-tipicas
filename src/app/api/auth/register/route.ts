import { NextResponse } from "next/server";
import db from "@/libs/db";
import { type User } from "@/app/types/user";
export async function POST(request: Request) {
    const data: User = await request.json();

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
        data
    })

    console.log("User created: " + JSON.stringify(newUser));
    return NextResponse.json(newUser);
}