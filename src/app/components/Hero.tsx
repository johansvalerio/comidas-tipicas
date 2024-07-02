import Image from "next/image"

export default function Hero() {
  return (
    <>
    <div className="bg-[url('/img/tamales3-banner.jpg')] w-full h-[300px] md:h-[450px] lg:h-[600px] xl:h-screen
            bg-no-repeat bg-cover opacity-40 ">
    </div>
              
          <div className="w-full h-full flex flex-col justify-center items-center absolute  lg:top-[-50px] top-[-150px] md:top-[-100px] xl:top-0">
            <h1 className="lg:text-6xl text-3xl text-white sm:text-4xl md:text-5xl font-bold text-center
             ">Bienvenidos a El Tamalito</h1>
            <p className="
            text-center
            text-sm
            sm:text-md
            md:text-md
            lg:text-lg
            text-slate-200 
             md:w-[550px] lg:w-[720px] sm:w-[400px] w-[360px]
            ">Somos una empresa comprometida a promover el delicioso sabor de la comida guanacasteca.</p>
            <div className='flex gap-2 my-5'>
              <a href="#ordenarForm" className='bg-amber-400 flex items-center gap-1 text-black border-2 
              border-amber-400 font-semibold p-2 rounded-lg 
              hover:bg-amber-300 hover:border-amber-300'>Pedí ya!
              <Image src="/tamal-icon.png" alt="tamales2-icon" className="rotate-6" width={25} height={25}
              loading="lazy" />
              </a>
             <a  href="#comidas" className='bg-black text-white px-6 py-2 rounded-lg border-2 border-black font-medium hover:bg-gray-900 hover:border-gray-900'>Comidas</a>
            </div>
             
          </div>
          </>
  )
}
