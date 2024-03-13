"use client"
// import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { type SearchUserForm } from "@/app/types/user"
import { useRouter } from "next/navigation"
export default function SearchInput() {
  const [value, setValue] = useState("")
  const router = useRouter()
  const { register, handleSubmit } = useForm<SearchUserForm>()

  const onSubmit = handleSubmit(async (data: SearchUserForm) => {
    console.log(data)
    const res = await fetch(`/api/users/${data.search_value}`)
    const resJSON = await res.json()
    router.push(`/users/${data.search_value}`)
    console.log(resJSON)
  })

  return (
    <div className="flex flex-col gap-2 text-black">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          {...register("search_value", {
            required: {
              value: true,
              message: "User is required",
            },
            onChange: (e) => setValue(e.target.value),
          })}
          value={value}
          id="search_value"
          name='search_value'
          className="bg-white rounded-full px-4 py-2"
          placeholder="Buscar usuario por nombre" />
        <button className="bg-white transition hover:bg-white/80 hover:scale-105 rounded-xl py-2 px-3 font-semibold" >Buscar</button>
      </form>
    </div>
  )
}
