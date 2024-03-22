import Header from './components/Header'
import Comidas from './components/Comidas'
import OrdenarForm from './components/OrdenarForm';


export default function Home() {

  return (
    <main className="w-full min-h-screen">
      <header>
        <Header />
      </header>

      <section id='comidas' className='p-24 bg-zinc-900'>
        <Comidas />
      </section>

      <section id='ordenarForm' className='p-24 bg-zinc-950'>
        <OrdenarForm />
      </section>

      <footer>

      </footer>
    </main>
  );
}
