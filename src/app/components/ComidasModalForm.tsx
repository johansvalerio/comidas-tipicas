import { Session } from "next-auth"
import { useState, useRef } from "react"
export default function ComidasModalForm({ isOpen, setIsOpen, comidaId, comidaName, session }: { isOpen: boolean, setIsOpen: any, comidaId: number, comidaName: string, session: Session | null }) {

  const [submit, setSubmit] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [quantity, setQuantity] = useState('')
  const [direction, setDirection] = useState('')
   
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)
    console.log(JSON.stringify(data))

    if (!data.get('quantity') || !data.get('direction')) {
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
        comida_id: comidaId
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
      setIsOpen(false)
    }

  }


  return (
    <div>

      {
        isOpen === true 
        && <div className="w-full max-w-sm p-4 flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-white">
        <form onSubmit={handleSubmit}
          ref={formRef}
          className="space-y-2">
          <h5 className="text-xl font-medium text-gray-900 dark:text-black">Pedido de &quot;{comidaName}&quot;</h5>
          <div>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-700">Cantidad</label>
            <input type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-slate-900" placeholder="Cantidad" required />
          </div>
          <div>
            <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-700">Dirección</label>
            <textarea
             id="direction" name="direction" placeholder="Dirección" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-slate-900 max-h-20 min-h-20" required />
          </div>
          <div className="flex w-full items-center gap-2 py-4">
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white 
          p-2 rounded font-medium" onClick={() => setIsOpen(false)}>Cancelar</button>
            <button type="submit" className="bg-amber-500 hover:bg-amber-400
         text-black p-2 rounded font-medium">Confirmar</button>
          </div>
        </form>

      </div>
    }
    </div>
  )
}
