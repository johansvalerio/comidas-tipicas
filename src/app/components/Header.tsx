import Image from "next/image"

export default function Header() {
  return (
    <div className="bg-[url('/tamales3-banner.jpg')] w-full h-[300px] md:h-[450px] lg:h-[600px] xl:h-screen
            bg-no-repeat bg-cover ">

          <div className="w-full h-full flex flex-col justify-center items-center gap-1">
            {/* <h1 className="text-lg font-semibold bg-white/80 text-black py-1 px-4">COMIDAS TÍPICAS</h1> */}
            <h1 className="text-5xl font-bold bg-black/80 py-4 px-10">EL TAMALITO</h1>
            <div className='flex gap-2 my-5'>
              <button className='bg-stone-50 flex items-center gap-1 text-black font-semibold p-2 rounded-lg hover:bg-stone-200'>Ordenar ahora
              <Image src="/tamal-icon.png" alt="tamales2-icon" className="rotate-6" width={25} height={25}
              loading="lazy" />
              </button>
             <a  href="#comidas" className='bg-gray-950 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900'>Comidas</a>
            </div>
             
          </div>
        </div>
  )
}
