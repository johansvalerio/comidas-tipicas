import React from 'react'

export default function Header() {
  return (
    <div className="bg-[url('/tamales3-banner.jpg')] w-full h-[300px] lg:h-[450px] xl:h-[700px]
            bg-no-repeat bg-cover">

          <div className="w-full h-full flex flex-col justify-center items-center gap-1">
            <h1 className="text-lg font-semibold bg-white text-black py-1 px-4">EL ARTE DE LA COCINA GUANACASTECA</h1>
            <h1 className="text-5xl font-bold bg-black p-4">LA CASONA DEL TAMAL</h1>
          </div>
        </div>
  )
}
