import RegisterForm from '@/app/auth/register/components/RegisterForm'
import ListUser from '@/app/users/components/ListUser'
import { GET } from "@/app/api/users/route"
import { type Users } from "@/app/types/user"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import { redirect } from 'next/navigation'

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login')
  }

  const users: Users = await (await GET()).json()

  return (
    <main className=" w-full min-h-screen flex items-center justify-center ">
      <div className='flex justify-center'>
        <div className='w-full max-w-sm flex justify-center mx-auto'>
          <RegisterForm />
        </div>
        <div className='w-full'>
          <ListUser users={users} />
        </div>
      </div>
    </main>
  );
}
