"use client";
import { type Users, type User, type UserFormData } from "@/app/types/user";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { useForm } from 'react-hook-form';

export default function ListUser({ users, updateUserList }: { users: Users, updateUserList: Function }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>();
  const [isEdit, setIsEdit] = useState<boolean | null>(false);
  const [userIdToEdit, setUserIdToEdit] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEditButton = (user: User) => {
    setIsEdit(!isEdit);
    if (isEdit == true) {

      //si damos click de nuevo en editar de un usuario elegido, se cierra el form
      if (userIdToEdit === user.user_id.toString()) {
        setIsEdit(false);
        setName("")
        setEmail("")
        setPassword("")
        setUserIdToEdit("")
      }
      //si el id del usuario que estamos focus es distinto al del usuario elegido, el form permance abierto
      else {
        setIsEdit(true);
        setName(user.user_name)
        setEmail(user.user_email)
        setPassword(user.user_password)
        setUserIdToEdit(user.user_id.toString())
      }
    }
    //cargamos los datos al abrir y cerrar el form
    reset()
    setName(user.user_name)
    setEmail(user.user_email)
    setPassword(user.user_password)
    setUserIdToEdit(user.user_id.toString())

    console.log(user)
  }

  const onSubmit = handleSubmit(async (data: UserFormData) => {
    const res = await fetch(`/api/users/${userIdToEdit}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
    await updateUserList(); // Llamada a la función para actualizar la lista de usuarios en SearchUser
    setIsEdit(false);
    const resJSON = await res.json()
    console.log(resJSON);
    
  });

  return (
    <div>
      {isEdit == true && (
        <form onSubmit={onSubmit}>
          <div className="flex gap-2 m-4">
            <label htmlFor="user_name">Name:</label>
            <input
              type="text"
              id="user_name"
              className="bg-transparent border-b-2 border-slate-300 
                focus:ring-0 focus:outline-none hover:outline"
              {...register("user_name", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex m-4 gap-2">
            <label htmlFor="user_email">Email:</label>
            <input
              type="email"
              id="user_email"
              className="bg-transparent border-b-2 border-slate-300
                focus:ring-0 focus:outline-none hover:outline"
              {...register("user_email", {
                required: {
                  value: true,
                  message: "Email is required",
                }
              })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex m-4 gap-2">
            <label htmlFor="user_password">Password:</label>
            <input
              type="password"
              id="user_password"
              className="bg-transparent border-b-2 border-slate-300 
                      focus:ring-0 focus:outline-none hover:outline"
              {...register("user_password", {
                required: {
                  value: true,
                  message: "Password is required",
                }
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 mt-3 p-2 text-sm font-medium rounded-md">Update user</button>
          <button type="button" onClick={() => setIsEdit(false)} className="w-full bg-slate-500 mt-3 p-2 text-sm font-medium rounded-md">Cancel</button>
        </form>
      )}

      <div className="grid grid-cols-3">
        {users.map((user, index) => (

          <ul className="w-full" key={user.user_id}>
            <li className="flex gap-2">
              <div>
                <p>{index + 1}.</p>
              </div>
              <div>
                <p>{user.user_id}</p>
                <p>Name: {user.user_name}</p>
                <p>Email: {user.user_email}</p>
                <p>Password: {user.user_password}</p>
                <p>{user.user_created_on.toString()}</p>
                <p>{user.user_updated_at.toString()}</p>
                <div className="flex gap-2">
                  <DeleteButton user_id={user.user_id} />
                  <button
                    onClick={() => { handleEditButton(user), setUserIdToEdit(user.user_id.toString()) }}
                    className={` ${isEdit && userIdToEdit === user.user_id.toString() ? 'bg-slate-500' : 'bg-teal-500'} w-full p-2 text-sm font-medium rounded-md`}>
                    {isEdit && userIdToEdit === user.user_id.toString() ? "Editing..." : "Edit"}
                  </button>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>

    </div>
  );
}
