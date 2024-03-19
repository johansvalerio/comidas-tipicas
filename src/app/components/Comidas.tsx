"use client"
import Image from "next/image";
import { useState } from "react";

const comidasTipicas = [
    {
        name: "Arroz de maíz",
        precio: "₡ 100",
        description: "Arroz de maíz con pollo",
        img: "/tamales3-banner.jpg"
    },

    {
        name: "Tamales",
        precio: "₡ 100",
        description: "Tamales de cerdo y pollo",
        img: "/tamales2-banner.jpg"

    },

    {
        name: "Escabeche",
        precio: "₡ 100",
        description: "Escabeche de la casa",
        img: "/tamales-banner.jpg"
    },

    , {
        name: "Frito",
        precio: "₡ 100",
        description: "Frito de cerdo",
        img: "/tamales-banner.jpg"
    }
]

export default function Comidas() {
    const [isClicked, setIsClicked] = useState(false);
    const [comida, setComida] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const [precio, setPrecio] = useState("");
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState("");

    const handleClick = (comidasTipicas: any) => {
        setIsClicked(true);
        setComida(comidasTipicas.name)
        setImg(comidasTipicas.img)
        setDescription(comidasTipicas.description)
        setPrecio(comidasTipicas.precio)
        setIsActive(comidasTipicas.name)

        if (comida !== comidasTipicas.name) {
            setIsClicked(true);
            setIsActive(comidasTipicas.name)
        }
        else {
            setIsClicked(!isClicked);
        }
    }

    return (
        <div>
            <div className="flex md:items-center gap-4  md:text-start mb-10">
                <h1 className='text-5xl font-bold text-white'>Comidas
                </h1>
                <Image src="/guanacaste.png" alt="Bandera Guanacaste" width={50} height={40} />
            </div>

            <div className="text-3xl md:flex md:justify-around mb-10">
                {comidasTipicas.map((comida: any) => (
                    <h2 key={comida.name}
                    onClick={() => { handleClick(comida) }}
                    className={`relative transition duration-1000
                    text-3xl font-bold text-white text-center mb-5 cursor-pointer
                    border-b-4 border-transparent hover:border-teal-500
                    ${isActive === comida.name ? 'border-b-4 border-teal-500' : 'border-b-4 hover:border-gray-200'}
                    `}>
                    {comida.name}
                </h2>
                ))}
            </div>

            {
                isClicked === true
                    ?
                    <div className="flex flex-col items-center justify-center">
                        {
                            isHover === true
                                && <div onMouseEnter={() => setIsHover(true)} className="z-10 absolute flex flex-col justify-center items-center gap-5 ">
                                    <h2 className="text-xl sm:text-3xl font-bold">{description}</h2>
                                    <h2 className="text-xl sm:text-3xl font-bold">Precio: {precio}</h2>
                                </div>
                                
                               
                        }
                        <Image src={img} alt={description} width={600} height={300} loading="lazy" 
                        className={`rounded-lg transition ease-linear ${isHover === true ? "opacity-40" : "opacity-100"}`}
                        onMouseEnter={() => setIsHover(true)} 
                        onMouseLeave={() => setIsHover(false)}/>
                    </div>
                    : 
                        <div role="status" className="flex flex-col justify-center items-center rounded shadow animate-pulse dark:border-gray-700">
                            <h2>Seleccione una comida</h2>
                            <div className="flex items-center justify-center w-[300px] h-[200px] sm:w-[600px] sm:h-[380px] mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                            </div>
                        </div>
                   
            }
        </div>
    )
}