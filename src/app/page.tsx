import Header from '@/app/components/Header'
import Comidas from '@/app/components/Comidas'


export default function Home() {

  return (
    <main className="w-full min-h-screen">
      <header>
        <Header />
      </header>

      <section id='comidas' className='p-24 bg-zinc-900'>
        <Comidas />
      </section>

      <section>
        <div className='w-full h-screen bg-zinc-950'></div>
      </section>

      <footer>

      </footer>
    </main>
  );
}
