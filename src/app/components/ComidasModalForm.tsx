"use client";

import { useState, FormEvent } from "react";
import { Minus, Plus, X } from "lucide-react";

interface ComidasModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  comida: string;
  id: number;
  precio: number;
}

export default function ComidasModalForm({
  isOpen,
  onClose,
  comida,
  id,
  precio,
}: ComidasModalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    direction: "",
    comment: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("quantity", quantity.toString());
    data.append("direction", formData.direction);
    data.append("comment", formData.comment || "No comments");
    data.append("comida_id", id.toString());

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          order_quantity: quantity,
          order_address: formData.direction,
          order_comment: formData.comment || "No comments",
          comida_id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error al realizar el pedido");
      }

      // Cerrar el modal y limpiar el formulario
      onClose();
      setFormData({ direction: "", comment: "" });
      alert("¡Pedido realizado con éxito!");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar tu pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Realizar Pedido</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{comida}</h3>
            <p className="text-emerald-600 font-semibold mb-4">
              {quantity} x ₡ {precio} = ₡ {quantity * Number(precio)}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm font-medium text-gray-700">
                Cantidad:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="direction"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Dirección de entrega
                </label>
                <input
                  type="text"
                  id="direction"
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ej: 200m oeste del parque central"
                />
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Comentarios adicionales (opcional)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Especificaciones o indicaciones adicionales"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
