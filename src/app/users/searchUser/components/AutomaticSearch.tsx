"use client";
import React, { useState, useEffect } from "react";
import ListUser from "./ListUser";
import Loading from "@/app/loading";
import {type Users } from "@/app/types/user";

export default function AutomaticSearch() {
  const [users, setUsers] = useState<Users>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Función para obtener los datos de la API 
  useEffect(() => {
    async function fetchUsers() {
      try {
        // Si el valor de búsqueda está presente, hacemos una llamada específica
        if (value) {
          // Llamamos a la API
          const res = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify( {value} ),
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const userData = await res.json();
          setUsers(userData);

          if (userData.length === 0) {
            setIsError(true);
          }
        } else {
          // Si no hay valor de búsqueda, obtenemos todos los usuarios
          const res = await fetch(`/api/users`);
          const userData = await res.json();
          setUsers(userData);
          setIsError(false);
          
        }
        setIsLoading(false); // Marcamos la carga como completada después de obtener los datos
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [value]); // Dependencia: value

  // Función para actualizar la lista de usuarios
  const updateUserList = async () => {
    try {
      // Aquí iría la lógica para obtener los usuarios actualizados, podrías llamar a la API nuevamente o hacer cualquier otro proceso necesario.
      const res = await fetch(`/api/users`);
      const userData = await res.json();
      setUsers(userData);
    } catch (error) {
      console.error("Error updating user list:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="flex items-center gap-2">
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
        <p>{value === "" ? "Todos los usuarios" : `Buscando usuario "${value}"`}</p>
      </div>
      {isLoading &&
        <Loading />
      }
      {isError && <p>No se encontraron usuarios.</p>}
      <ListUser users={users} updateUserList={updateUserList} /> {/* Pasar la función como prop */}
    </div>
  );
}
