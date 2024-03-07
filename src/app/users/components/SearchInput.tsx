"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchInput() {
  const [value, setValue] = useState("")
  const router = useRouter()
  return (
    <div className="flex flex-col gap-2 text-black">
      <input 
        className="rounded-full py-3 px-5 border-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Buscar usuario por nombre" />
        <p className="text-red-500">{value}</p>
        <div className="w-full flex justify-center items-center">
        <button className="bg-white transition hover:bg-white/80 hover:scale-105 rounded-xl py-2 px-3 font-semibold" onClick={() => router.push(`/users/${value}`)}>Buscar</button>
        </div>
        
    </div>
  )
}
