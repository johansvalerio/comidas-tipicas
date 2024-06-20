"use client"
import { type Comidas } from "@/app/types/comida"
import { useState, useRef } from "react"

export default function OrdenarForm({ comidas }: { comidas: Comidas }) {

  const [submit, setSubmit] = useState(false)
  const [addComment, setAddComment] = useState(true)
  const [comida, setComida] = useState<{ id: number; name: string }>({ id: 0, name: "" });

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

    if (!data.get('comment')) {
      data.append('comment', 'No comments')
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
    if (formRef.current) {
      formRef.current.reset()
    }

  }

  return (
    <div className="w-full flex-col flex md:flex-row justify-evenly items-center">
      <div className="flex gap-2 items-center mb-5" >
        {submit === true ? <h1 className="text-5xl">Gracias por ordenar!</h1>
          : <h1 className="text-7xl text-center text-choco-200 font-bold">¡Pedí acá!  <br />{comida.name}</h1>} 
      </div>

      <div className="w-full max-w-xs">
        <form className="flex flex-col gap-4 bg-white shadow-2xl py-7 px-5 rounded-md text-gray-500"
          onSubmit={handleSubmit}
          ref={formRef}>

          <select
            name="comida"
            id="comida"
            className="border-2 border-black p-2 rounded-lg text-gray-500"
            onChange={(e) => {
              const selectedComida = comidas.find(comida => comida.comida_id === parseInt(e.target.value, 10));
              if (!selectedComida) {
                setComida({ id: 0, name: "" });
              }
              if (selectedComida) {
                setComida({
                  id: selectedComida.comida_id,
                  name: selectedComida.comida_name
                });
              }
            }}
          >
            <option value="" onClick={() => setComida({ id: 0, name: "" })}>Selecciona una comida</option>
            {comidas.map((comida) => (
              <option
                key={comida.comida_id}
                value={comida.comida_id.toString()} // Cambiado de comida.comida_id a string
                className="text-black"
              >
                {comida.comida_name} - ₡{comida.comida_price}
              </option>
            ))}
          </select>

          <input type="number" name="quantity" id="quantity" placeholder="Cantidad" className="border-2 border-black p-2 rounded-lg" />
          <textarea id="direction" name="direction" placeholder="Dirección" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />

          <p className="cursor-pointer flex" onClick={() => setAddComment(!addComment)}>
            { addComment === true
              ? <span className="flex p-1.5 gap-1 bg-choco-100 font-medium rounded-full text-white"> Ocultar comentario <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" 
              fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg> </span>
              : <span className="flex p-1.5 gap-1 bg-choco-100 font-medium text-white rounded-full"> Agregar comentario <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg></span>
              }
          </p>

          {
            addComment === true
            && <textarea id="comment" name="comment" placeholder="Comentarios" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />

          }

          <button type="submit" className="bg-choco-200 font-semibold hover:opacity-90 text-white p-2 rounded">
            Pedir
          </button>

        </form>
      </div>
    </div>
  )
}
