

export default function OrdenarForm() {
  return (
    <div className="w-full flex-col gap-4 flex md:flex-row justify-around items-center">
      <div >
          <h1 className="text-5xl">Ordenar!</h1>
      </div>

      <div>
      <form className="flex flex-col gap-4 bg-white/90 py-7 px-5 rounded-md text-gray-500">
        <input type="text" placeholder="Comida" className="border-2 border-black p-2 rounded-lg"/>
        <input type="number" placeholder="Cantidad" className="border-2 border-black p-2 rounded-lg"/>
        <input type="telephone" placeholder="Teléfono" className="border-2 border-black p-2 rounded-lg"/>
        <textarea id="direction" placeholder="Dirección" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />
        <textarea id="comentario" placeholder="Comentarios" className="border-2 border-black p-2 rounded-lg w-full max-h-20 min-h-20" />
        <button type="submit" className="bg-zinc-700 hover:bg-zinc-900 text-white p-2 rounded">Enviar orden</button>
      </form>
      </div>
    </div>
  )
}
