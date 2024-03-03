"use client"
import { type Users, type User, type UserFormData } from "@/app/types/user"
import DeleteButton from "./DeleteButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'


export default function ListUser({ users }: { users: Users }) {
  let count = 0
  const [isEdit, setIsEdit] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState("")
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>()

  const handleEditButton = ({ user_id, user_name, user_email, user_password }: User) => {
    setIsEdit(!isEdit)
    setName(user_name)
    setEmail(user_email)
    setPassword(user_password)
    setId(user_id.toString())
  }

  const onSubmit = handleSubmit(async (data: UserFormData) => {
    console.log("Id: ", id)
    console.log(data)
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        user_name: data.user_name,
        user_email: data.user_email,
        user_password: data.user_password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resJSON = await res.json()
    console.log(resJSON)
    router.refresh()

  })


  return (
    <div>
      
       
          <div>
            {
              users.map((user) => (
                count += 1,
                <ul className="w-full" key={user.user_id}>
                  <li className="flex gap-2">
                    <div>
                      <p>{count}.</p>
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
                        {/* <EditButton user_id={user.user_id} /> */}
                        <button
                          onClick={() => handleEditButton(user)}
                          className="bg-teal-500 w-full p-2 text-sm font-medium rounded-md">
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              ))
            }
          </div>
        
          
            <form onSubmit={onSubmit}>
              <ul>
                <li className="flex gap-2 m-4">
                  <label htmlFor="user_name">Name:</label>
                  <input
                    {...register("user_name", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                    value={name}
                    type="text"
                    name="user_name"
                    id="user_name"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-b-2 border-slate-300 
        focus:ring-0 focus:outline-none hover:outline" />
                </li>
                <li className=" flex m-4 gap-2">
                  <label htmlFor="user_email">Email:</label>
                  <input
                    {...register("user_email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    name="user_email"
                    id="user_email"
                    className="bg-transparent border-b-2 border-slate-300
            focus:ring-0 focus:outline-none hover:outline"/>
                </li>
                <li className=" flex m-4 gap-2">
                  <label htmlFor="user_password">Password:</label>
                  <input
                    {...register("user_password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="user_password"
                    id="user_password"
                    className="bg-transparent border-b-2 border-slate-300 
        focus:ring-0 focus:outline-none hover:outline " />
                </li>
              </ul>
              <button type="submit" onClick={() => setIsEdit(!isEdit)}
                className="w-full bg-teal-500 mt-3 p-2 text-sm font-medium rounded-md">Edit user</button>
            </form>
    </div>
  )
}

