import Header from './components/Header'
import ComidasView from './components/ComidasView'
import OrdenarForm from './components/OrdenarForm';
import Footer from './components/Footer'
import db from "@/libs/db"
import { type Comidas } from "@/app/types/comida"


export default async function Home() {

  const comidas: Comidas = await db.comidas.findMany()
  

  return (
    <main className="w-full min-h-screen">
      <header>
        <Header />
      </header>

      <section id='comidas' className='p-24 bg-zinc-900 '>
        <ComidasView />
      </section>

      {/* <section id='origenes' className='p-24 bg-stone-200 h-screen'>
      
      </section> */}

      <section id='ordenarForm' className='flex bg-choco-100 h-screen w-full justify-center items-center'>
        <OrdenarForm comidas={comidas} />
      </section>

      <footer id='footer' className='bg-choco-400'>
        <Footer />
      </footer>
    </main>
  );
}
