import Image from "next/image"

const info = [
    {
        name: 'Crear usuarios',
        url: '/auth/register/',
        description: 'Crea usuarios en la base de datos',
        img: "/user-plus.png"

    },
    {
        name: 'Buscar usuarios',
        url: '/users/searchUser/',
        description: 'Busca usuarios en la base de datos',
        img: "/user-search.png"
    }
]

export default function Card() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto">
            {info.map((item) => (
                <a key={item.name} href={item.url}>
                    <ul
                        className="flex flex-col gap-3 items-center justify-center
            border-2 border-yellow-500 rounded-xl p-5 text-white">

                        <li><Image src={item.img} width={60} height={50} alt={item.name}/></li>
                        <li className="text-lg font-semibold">{item.name}</li>
                        <li className="text-sm">{item.description}</li>

                    </ul>
                </a>
            ))}
        </div>
    )
}
