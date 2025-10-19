import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Navbar from "@/app/components/Navbar";

export default async function NavbarServer() {
  const session = await getServerSession(authOptions);
  return <Navbar session={session} />;
}
