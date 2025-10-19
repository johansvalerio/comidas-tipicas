import Hero from "./components/Hero";
import ComidasView from "./components/ComidasView";
import OrdenarForm from "./components/OrdenarForm";
import db from "@/libs/db";
import { type Comidas } from "@/app/types/comida";
import { authOptions } from "@/utils/authOptions";
import { Session, getServerSession } from "next-auth";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  const comidas: Comidas = await db.comidas.findMany();

  return (
    <main className="w-full min-h-screen bg-amber-50 backdrop-blur-sm">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20
         "
      >
        <Hero />
      </section>

      {/* Comidas Section */}
      <section id="comidas" className="py-24 px-4 bg-white">
        <ComidasView session={session} />
      </section>

      {/* Ordenar Form Section */}
      <section
        id="ordenarForm"
        className="flex min-h-screen py-16 w-full justify-center items-center bg-amber-900/5"
      >
        <div className="w-full max-w-4xl mx-4 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-amber-100">
          <OrdenarForm comidas={comidas} />
        </div>
      </section>
    </main>
  );
}
