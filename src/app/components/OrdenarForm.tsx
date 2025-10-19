"use client";
import { type Comidas } from "@/app/types/comida";
import { useState, useRef } from "react";

export default function OrdenarForm({ comidas }: { comidas: Comidas }) {
  const [submit, setSubmit] = useState(false);
  const [addComment, setAddComment] = useState(true);
  const [comida, setComida] = useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      !data.get("comida") ||
      !data.get("quantity") ||
      !data.get("direction")
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (!data.get("comment")) {
      data.append("comment", "No comments");
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          order_quantity: data.get("quantity"),
          order_address: data.get("direction"),
          order_comment: data.get("comment"),
          comida_id: data.get("comida"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error al procesar el pedido");

      const newOrder = await res.json();
      setSubmit(true);
      console.log("Pedido exitoso:", newOrder);

      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un error al procesar tu pedido. Por favor intenta nuevamente."
      );
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12 p-6 md:p-12">
      <div className="text-center md:text-left md:max-w-md">
        {submit ? (
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-costa-rica-700 mb-4">
              ¡Gracias por tu pedido! 🎉
            </h1>
            <p className="text-lg text-neutral-600">
              Estamos preparando tu pedido con mucho amor. Te notificaremos
              cuando esté en camino.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold  mb-2">
              ¡Haz tu pedido!
            </h1>
            <p className="text-2xl text-emerald-600 font-medium">
              {comida.name || "Selecciona un platillo"}
            </p>
            <p className="text-neutral-600 mt-2">
              Llena el formulario y disfruta de los auténticos sabores de Costa
              Rica en la comodidad de tu hogar.
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-md">
        <form
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-amber-100 transition-all duration-300 hover:shadow-2xl"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="comida"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Selecciona un platillo
              </label>
              <select
                name="comida"
                id="comida"
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:ring-2 focus:ring-costa-rica-400 focus:border-costa-rica-400 transition-all duration-200 bg-white/50"
                onChange={(e) => {
                  const selectedComida = comidas.find(
                    (c) => c.comida_id === parseInt(e.target.value, 10)
                  );
                  setComida(
                    selectedComida
                      ? {
                          id: selectedComida.comida_id,
                          name: selectedComida.comida_name,
                        }
                      : { id: 0, name: "" }
                  );
                }}
                required
              >
                <option value="">Selecciona una opción</option>
                {comidas.map((comida) => (
                  <option
                    key={comida.comida_id}
                    value={comida.comida_id.toString()}
                    className="text-neutral-800"
                  >
                    {comida.comida_name} - ₡{comida.comida_price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Cantidad
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                placeholder="¿Cuántos deseas?"
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:ring-2 focus:ring-costa-rica-400 focus:border-costa-400 transition-all duration-200 bg-white/50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="direction"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Dirección de entrega
              </label>
              <textarea
                id="direction"
                name="direction"
                placeholder="¿A dónde lo enviamos?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:ring-2 focus:ring-costa-rica-400 focus:border-costa-400 transition-all duration-200 bg-white/50 resize-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setAddComment(!addComment)}
                className="flex items-center gap-2 text-sm font-medium text-costa-rica-700 hover:text-costa-rica-800 transition-colors duration-200 group"
              >
                {addComment ? (
                  <>
                    <span>Ocultar comentario</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Agregar un comentario (opcional)</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-y-0.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </>
                )}
              </button>

              {addComment && (
                <div className="mt-3 animate-fadeIn">
                  <textarea
                    id="comment"
                    name="comment"
                    placeholder="¿Algún detalle adicional? Ej: Sin cebolla, sin picante, etc."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:ring-2 focus:ring-costa-rica-400 focus:border-costa-400 transition-all duration-200 bg-white/50 resize-none"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
            Realizar pedido
          </button>
        </form>
      </div>
    </div>
  );
}
