import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db'
// import bcrypt from 'bcrypt'

 const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req): Promise<any> {
        console.log(credentials)

        const userFound = await db.users.findUnique({
            where: {
                user_email: credentials?.email
            },
            include: {
                user_role: true
            }
        })

        if (!userFound) throw new Error('No user found')

        console.log(userFound)

        // const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

        // if (!matchPassword) throw new Error('Wrong password')

        return {
            id: userFound.user_id,
            name: userFound.user_name,
            email: userFound.user_email,
            role: userFound.user_role?.role_id
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.sub;// token.uid or token.sub both work
        session.user.role = token.role
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.sub = user.id; // token.uid or token.sub both work
        token.role = user.role
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
