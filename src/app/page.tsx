import Header from './components/Header'
import ComidasView from './components/ComidasView'
import OrdenarForm from './components/OrdenarForm';
import db from "@/libs/db"
import { type Comidas } from "@/app/types/comida"


export default async function Home() {

  const comidas: Comidas = await db.comidas.findMany()
  

  return (
    <main className="w-full min-h-screen">
      <header>
        <Header />
      </header>

      <section id='comidas' className='p-24 bg-zinc-900'>
        <ComidasView />
      </section>

      <section id='ordenarForm' className='p-24 bg-zinc-950'>
        <OrdenarForm comidas={comidas} />
      </section>

      <footer>

      </footer>
    </main>
  );
}
