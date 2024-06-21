import Header from './components/Header'
import ComidasView from './components/ComidasView'
import OrdenarForm from './components/OrdenarForm';
import db from "@/libs/db"
import { type Comidas } from "@/app/types/comida"
import { authOptions } from "@/utils/authOptions";
import { Session, getServerSession } from "next-auth";

export default async function Home() {

  const session: Session | null = await getServerSession(authOptions)
  const comidas: Comidas = await db.comidas.findMany()
  

  return (
    <main className="w-full min-h-screen">
      
        <Header />
     

      <section id='comidas' className='p-24 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950   '>
        <ComidasView session={session} />
      </section>

      {/* <section id='origenes' className='p-24 bg-stone-200 h-screen'>
      
      </section> */}

      <section id='ordenarForm' className='flex bg-choco-100 h-screen w-full justify-center items-center'>
        <OrdenarForm comidas={comidas} />
      </section>

    </main>
  );
}
