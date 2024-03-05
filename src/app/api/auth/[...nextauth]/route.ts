import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";

export const authOptions = ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user_email: { label: "email", type: "email", placeholder: "jsmith@example.com" },
                user_password: {  label: "Password", type: "password", placeholder: "********" }
            },  
              async authorize(credentials, req): Promise<any> {
                console.log("Credentials: " + credentials)
               const userFounde = await db.users.findUnique({
                   where: {
                       user_email: credentials?.user_email
                   }
               })
            }
        })
    ]
})
const hanlder =  NextAuth(authOptions)
export { hanlder as GET, hanlder as POST }