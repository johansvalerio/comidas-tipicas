"use client"
import { type Comidas } from "@/app/types/comida"
import { useState, useRef } from "react"

export default function OrdenarForm({comidas}: {comidas: Comidas}) {

  const [submit, setSubmit] = useState(false)
  const [addComment, setAddComment] = useState(false)
  //referenciamos el formulario para limpiarlo mediante la propiedad ref 
  //<form ref = {formRef}>
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (!data.get('comida') || !data.get('quantity') || !data.get('direction')) {
      alert('Por favor completa todos los campos')
      return
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        order_quantity: data.get('quantity'),
        order_address: data.get('direction'),
        order_comment: data.get('comment'),
        comida_id: data.get('comida'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res)

    const newOrder = await res.json()
    setSubmit(true)
    console.log(newOrder)

    //limpiar formulario
    if(formRef.current) {
      formRef.current.reset()
    }

  }

  return (
    <div className="w-full flex-col flex md:flex-row justify-around items-center">
      <div >
        {submit === true ? <h1 className="text-5xl">Gracias por ordenar!</h1> : null}
          <h1 className="text-5xl">Ordenar!</h1>
      </div>

      <div>
        
      <form className="flex flex-col gap-4 bg-white/90 py-7 px-5 rounded-md text-gray-500"
      onSubmit={handleSubmit}
      ref={formRef}>
        <select name="comida" id="comida" className="border-2 border-black p-2 rounded-lg text-gray-500">
        {comidas.map((comida) => (
          <option key={comida.comida_id} value={comida.comida_id} className="text-black">{comida.comida_name} - ₡{comida.comida_price}</option>
        ))}
        </select>
        <input type="number" name="quantity" id="quantity" placeholder="Cantidad" className="border-2 border-black p-2 rounded-lg"/>
        <textarea id="direction" name="direction" placeholder="Dirección" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />
        <p className="cursor-pointer flex" onClick={() => setAddComment(!addComment)}>
          {addComment === true 
          ? <span className="flex"> Ocultar comentario <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg> </span>
        : <span className="flex"> Agregar comentario <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg></span>  }
        </p>


        {
          addComment === true 
          && <textarea id="comment" name="comment" placeholder="Comentarios" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" /> 
          
        }
        <button type="submit" className="bg-zinc-700 hover:bg-zinc-900 text-white p-2 rounded">Enviar orden</button>
      </form>
      </div>
    </div>
  )
}
