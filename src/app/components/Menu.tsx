import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

async function Menu() {
    const session: Session | null = await getServerSession(authOptions);
    console.log(session?.user);

    return (

        <nav className="w-full flex justify-between items-center bg-gray-950 text-white md:px-24 px-10 py-3 fixed">
            <Link href={"/"} className="text-xl font-bold">LA CASONA DEL TAMAL</Link>

            <ul className="flex gap-x-5">
                {!session?.user ? (
                    <>
                        <li>
                            <Link href="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/auth/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/users/miperfil">
                                {session?.user?.name}
                            </Link>

                        </li>
                        <li>
                            <Link href="/api/auth/signout">Logout</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Menu;
