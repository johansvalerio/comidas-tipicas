"use client"
import { type Comidas } from "@/app/types/comida"

export default function OrdenarForm({comidas}: {comidas: Comidas}) {

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)

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

    const newOrder = await res.json()
    console.log(newOrder)
  }

  return (
    <div className="w-full flex-col gap-4 flex md:flex-row justify-around items-center">
      <div >
          <h1 className="text-5xl">Ordenar!</h1>
      </div>

      <div>
      <form className="flex flex-col gap-4 bg-white/90 py-7 px-5 rounded-md text-gray-500"
      onSubmit={handleSubmit}>
        <select name="comida" id="comida" className="border-2 border-black p-2 rounded-lg text-gray-500">
        {comidas.map((comida) => (
          <option key={comida.comida_id} value={comida.comida_id} className="text-black">{comida.comida_name} - ₡{comida.comida_price}</option>
        ))}
        </select>
        <input type="number" name="quantity" id="quantity" placeholder="Cantidad" className="border-2 border-black p-2 rounded-lg"/>
        <textarea id="direction" name="direction" placeholder="Dirección" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />
        <textarea id="comment" name="comment" placeholder="Comentarios" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />
        <button type="submit" className="bg-zinc-700 hover:bg-zinc-900 text-white p-2 rounded">Enviar orden</button>
      </form>
      </div>
    </div>
  )
}
