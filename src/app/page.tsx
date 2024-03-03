import RegisterForm from '@/app/register/components/RegisterForm'
import ListUser from '@/app/users/components/ListUser'
import { GET } from "@/app/api/users/route"
import { type Users } from "@/app/types/user"

export default async function Home() {

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
