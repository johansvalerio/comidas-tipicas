import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import { redirect } from 'next/navigation'
import UsersDashboard from "./components/UsersDashboard";

export default async function UsersPage() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login')
  }


  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center py-24 gap-10">
      <UsersDashboard />
    </div>
  );
}
