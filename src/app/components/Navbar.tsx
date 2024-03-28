import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, type Session } from "next-auth";

async function Menu() {
    const session: Session | null = await getServerSession(authOptions);
    //console.log(session?.user);

    return (

        <nav className="w-full flex justify-between items-center bg-black/60 text-white md:px-24 px-10 py-3 fixed z-10 border-zinc-900 border-b">
            <Link href={"/"} className="text-xl font-bold">EL TAMALITO</Link>

            <ul className="flex gap-5">
                {!session?.user
                    ? (
                        <>
                            <li>
                                <Link href="/auth/login">Iniciar sesión</Link>
                            </li>
                            <li>
                                <Link href="/auth/register">Registrarse</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/users/miperfil">
                                    {session?.user?.name}
                                </Link>

                            </li>
                            <li className="text-center">
                                <Link href="/users/orders">Ordenes</Link>
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
