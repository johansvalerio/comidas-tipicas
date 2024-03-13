"use client";
import React, { useState, useEffect } from "react";
import ListUser from "../../components/ListUser";
import { type User } from "@/app/types/user";

export default function ClientAutomaticSearch() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
  useEffect(() => {
    async function fetchUsers() {
      try {
        // Si el valor de búsqueda está presente, hacemos una llamada específica
        if (value) {
          const res = await fetch(`/api/users/[id]`, {
            method: 'POST',
            body: JSON.stringify({ value }),
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const userData = await res.json();
          setUsers(userData);
        } else {
          // Si no hay valor de búsqueda, obtenemos todos los usuarios
          const res = await fetch(`/api/users`);
          const userData = await res.json();
          setUsers(userData);
        }
        setLoading(false); // Marcamos la carga como completada después de obtener los datos
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [value]); // Dependencia: value

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="flex gap-2">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Buscar usuario"
          type="text"
          className="bg-white rounded-full px-4 py-2 text-black"
        />
        <button className="bg-white transition text-black hover:bg-white/80 rounded-xl py-2 px-3 font-semibold">
          Buscar
        </button>
        <p>{value === "" ? "Todos los usuarios" : `Buscando usuario ${value}`}</p>
      </div>
      <ListUser users={users} />
    </div>
  );
}
