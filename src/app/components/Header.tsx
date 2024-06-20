import Image from "next/image"

export default function Header() {
  return (
    <div className="bg-[url('/img/tamales3-banner.jpg')] w-full h-[300px] md:h-[450px] lg:h-[600px] xl:h-screen
            bg-no-repeat bg-cover opacity-80 ">

          <div className="w-full h-full flex flex-col justify-center items-center gap-1">
            <h1 className="text-5xl font-bold bg-black/80 py-4 px-10">EL TAMALITO</h1>
            <div className='flex gap-2 my-5'>
              <a href="#ordenarForm" className='bg-choco-50 flex items-center gap-1 text-black  border-2 
              border-choco-300 font-semibold p-2 rounded-lg hover:bg-choco-100 hover:border-choco-300'>Ordenar ahora
              <Image src="/tamal-icon.png" alt="tamales2-icon" className="rotate-6" width={25} height={25}
              loading="lazy" />
              </a>
             <a  href="#comidas" className='bg-gray-950 text-white px-6 py-2 rounded-lg border-2 border-gray-950 font-medium hover:bg-gray-900 hover:border-gray-900'>Comidas</a>
            </div>
             
          </div>
        </div>
  )
}
