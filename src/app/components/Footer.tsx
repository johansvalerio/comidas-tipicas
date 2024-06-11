import Image from "next/image"
function Footer() {
  return (
    <div className="py-24">
    <div className="flex justify-center items-center">
      <hr className="w-full" />
       <ul className="w-full flex lg:flex-row  flex-col justify-center items-center lg:gap-4 gap-2  border rounded-full py-2 px-1">
        <li className="flex items-center gap-1">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook text-blue-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
        <p className="text-md font-medium">El Tamalito</p>
        </li>
        <li className="flex items-center gap-1">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp text-green-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
        <p className="text-sm">+506 8309 2417</p>
        </li>
      </ul>
      <hr className="w-full" />
      </div>

     <div className="flex w-full justify-center items-center mt-10">
        <ul className="text-center">
          <li>Cañas, Guanacaste, Costa Rica</li>
          <li>Todos los derechos reservados © 2024</li>
        </ul>
      </div>
        
    </div>
  )
}

export default Footer