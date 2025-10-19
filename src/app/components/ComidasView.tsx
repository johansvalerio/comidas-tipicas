"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import {
  ShoppingCart,
  Plus,
  Minus,
  ChevronRight,
  Star,
  Clock,
  Utensils,
  Clock3,
  Flame,
} from "lucide-react";
import ComidasModalForm from "./ComidasModalForm";

interface ComidasProps {
  id: number;
  name: string;
  precio: number;
  description: string;
  img: string;
  prepTime?: string;
  rating?: number;
  category?: string;
  isPopular?: boolean;
}

const comidasTipicas: ComidasProps[] = [
  {
    id: 1,
    name: "Tamales",
    precio: 2500,
    description:
      "Deliciosos tamales de cerdo o pollo envueltos en hoja de plátano, con masa de maíz sazonada y rellenos de carne, arroz y vegetales. Una tradición costarricense especialmente en épocas festivas.",
    img: "/img/tamales.jpg",
    prepTime: "45 min",
    rating: 4.8,
    category: "Tamales",
    isPopular: true,
  },
  {
    id: 2,
    name: "Escabeche",
    precio: 2800,
    description:
      "Tradicional escabeche costarricense preparado con verduras encurtidas, especias autóctonas y trozos de pollo o cerdo. Refrescante y lleno de sabor, ideal con tortillas recién hechas.",
    img: "/img/escabeche.jpg",
    prepTime: "30 min",
    rating: 4.6,
    category: "Escabeche",
  },
  {
    id: 3,
    name: "Arroz de Maíz",
    precio: 2200,
    description:
      "Exquisito arroz de maíz cocido con granos frescos y sazón tradicional. Versátil y delicioso, puede acompañar tus proteínas favoritas o disfrutarse como plato principal.",
    img: "/img/arrozmaiz.jpg",
    prepTime: "35 min",
    rating: 4.7,
    category: "Arroz de Maíz",
  },
  {
    id: 4,
    name: "Frito",
    precio: 3200,
    description:
      "Jugosos trozos de cerdo dorados hasta quedar crujientes por fuera y tiernos por dentro, acompañados de arroz, frijoles y plátano. Un clásico de la cocina costarricense.",
    img: "/img/frito.jpg",
    prepTime: "50 min",
    rating: 4.9,
    category: "Frito",
    isPopular: true,
  },
];

export default function ComidasView({ session }: { session: Session | null }) {
  const [selectedDish, setSelectedDish] = useState<ComidasProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  useEffect(() => {
    if (comidasTipicas.length > 0 && !selectedDish) {
      setSelectedDish(comidasTipicas[0]);
    }
  }, [selectedDish]);

  const handleDishSelect = (dish: ComidasProps) => {
    setSelectedDish(dish);
  };

  const handleOrder = () => {
    if (!session) {
      signIn();
      return;
    }
    setIsModalOpen(true);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-emerald-500 text-emerald-500" : "text-gray-200"}`}
        />
      ));
  };

  // Get unique categories
  const categories = [
    "Todos",
    ...Array.from(
      new Set(
        comidasTipicas
          .map((item) => item.category)
          .filter((category): category is string => Boolean(category))
      )
    ),
  ];

  // Filter dishes by active category
  const filteredDishes =
    activeCategory === "Todos"
      ? comidasTipicas
      : comidasTipicas.filter((dish) => dish.category === activeCategory);

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4"
          >
            Nuestro Menú Tradicional
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Sabores que <span className="text-emerald-600">inspiran</span>
          </motion.h2>

          <motion.p
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Descubre nuestra selección de platos tradicionales preparados con
            ingredientes frescos y recetas auténticas.
          </motion.p>
        </div>

        {/* Categorías */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                activeCategory === category
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de comidas */}
          <div className="space-y-6">
            {filteredDishes.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: item.id * 0.05 }}
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => handleDishSelect(item)}
                className={`
                  cursor-pointer transition-all duration-300 
                  ${
                    selectedDish?.id === item.id
                      ? "ring-2 ring-emerald-500 shadow-lg"
                      : "bg-white shadow-sm hover:shadow-md"
                  }
                  rounded-2xl overflow-hidden
                  transform hover:-translate-y-1
                `}
              >
                <div className="relative h-40">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {item.isPopular && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <Flame className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">
                        {item.name}
                      </h3>
                      <span className="bg-white/90 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-100">
                        ₡{item.precio.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-emerald-400">
                      {renderStars(item.rating || 4.5)}
                      <span className="ml-1 text-xs text-white/90">
                        ({item.rating?.toFixed(1) || "4.5"})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-neutral-500">
                      <Clock3 className="w-4 h-4 mr-1" />
                      <span>{item.prepTime}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vista detallada */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedDish && (
                <motion.div
                  key={selectedDish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="md:flex h-full">
                    <div className="md:w-1/2 h-80 md:h-auto relative">
                      <Image
                        src={selectedDish.img}
                        alt={selectedDish.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      {selectedDish.isPopular && (
                        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                          <Flame className="w-3 h-3 mr-1" />
                          Más Popular
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full mb-3">
                              {selectedDish.category}
                            </span>
                            <h2 className="text-3xl font-bold text-neutral-900">
                              {selectedDish.name}
                            </h2>
                            <div className="flex items-center mt-2">
                              {renderStars(selectedDish.rating || 4.5)}
                              <span className="ml-2 text-sm text-neutral-500">
                                ({selectedDish.rating?.toFixed(1) || "4.5"})
                              </span>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-emerald-600">
                            ₡{selectedDish.precio.toLocaleString()}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                            Descripción
                          </h3>
                          <p className="text-neutral-600 leading-relaxed">
                            {selectedDish.description}
                          </p>
                        </div>

                        <div className="py-6 border-t border-neutral-100">
                          <div className="flex items-center text-sm text-neutral-500 mb-4">
                            <Clock3 className="w-4 h-4 mr-2" />
                            <span>
                              Tiempo de preparación: {selectedDish.prepTime}
                            </span>
                          </div>

                          <h4 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                            Ingredientes Destacados
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedDish.name === "Tamales" && (
                              <>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Masa de Maíz
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Carne de Cerdo
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Hoja de Plátano
                                </span>
                              </>
                            )}
                            {selectedDish.name === "Escabeche" && (
                              <>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Zanahoria
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Cebolla
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Chile Dulce
                                </span>
                              </>
                            )}
                            {selectedDish.name === "Arroz de Maíz" && (
                              <>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Maíz Tierno
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Cilantro
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Ajo
                                </span>
                              </>
                            )}
                            {selectedDish.name === "Casado Típico" && (
                              <>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Arroz
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Frijoles
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Plátano Maduro
                                </span>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full">
                                  Carne
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOrder}
                        className="w-full py-4 px-6 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {session
                          ? "Agregar al Pedido"
                          : "Iniciar Sesión para Ordenar"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ComidasModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comida={selectedDish?.name || ""}
        id={selectedDish?.id || 0}
        precio={selectedDish?.precio || 0}
      />
    </div>
  );
}
