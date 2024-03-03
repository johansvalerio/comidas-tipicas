"use client"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { type UserFormData } from '@/app/types/user'
import { useRouter } from 'next/navigation'

function RegisterForm() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>()
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const onSubmit = handleSubmit(async (data: UserFormData) => {
        console.log(data)
        const res = await fetch('/api/register', {
            method: 'POST',
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
        router.refresh()
        console.log(resJSON)
    })

    return (
        <div className='w-full'>
            <h1 className='text-xl'>Registro de usuario</h1>
            <div className="w-full p-4 bg-slate-300 rounded-lg text-black">
                <form
                    className="flex flex-col space-y-3"
                    onSubmit={onSubmit}>
                    <label htmlFor="user_name" className='font-semibold opacity-70'>Name: </label>
                    <input
                        type="text"
                        {...register("user_name", {
                            required: {
                                value: true,
                                message: "Username is required",
                            },
                            onChange: (e) => setName(e.target.value),
                        })}
                        id="user_name"
                        name='user_name'
                        className="rounded-md p-2.5 text-md opacity-60" placeholder="John Doe" />
                    {
                        errors.user_name && <p className='text-red-500'>{errors.user_name.message}</p>
                    }
                    <label htmlFor="user_email" className='font-semibold opacity-70'>Email:</label>
                    <input
                        type="email"
                        {...register("user_email", {
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                            onChange: (e) => setEmail(e.target.value),
                        })}
                        id="user_email"
                        name='user_email'
                        className="rounded-md p-2.5 text-md opacity-60"
                        placeholder="ejemplo@dominio.com" />
                    {
                        errors.user_email && <p className='text-red-500'>{errors.user_email.message}</p>
                    }
                    <label htmlFor="user_password" className='font-semibold opacity-70'>Password: </label>
                    <input
                        {...register("user_password", {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            onChange: (e) => setPassword(e.target.value),
                        })}
                        type="password" id="user_password" name='user_password' className="rounded-md p-2.5 text-md opacity-60" placeholder="******" />
                    {
                        errors.user_password && <p className='text-red-500'>{errors.user_password.message}</p>
                    }
                    <label htmlFor="confirmPassword" className='font-semibold opacity-70'>Confirm password: </label>
                    <input
                        {...register("confirmPassword", {
                            required: true,
                            onChange: (e) => setConfirmPassword(e.target.value),
                        })}
                        type="password" id="confirmPassword" name='confirmPassword' className="rounded-md p-2.5 text-md opacity-60" placeholder="******" />
                    {
                        errors.confirmPassword && <p className='text-red-500'>Las contraseñas no coinciden</p>
                    }
                    <hr />
                    <button type='submit' className='rounded-md p-2.5 text-md bg-gray-900 text-white hover:bg-gray-800'>Registrar</button>

                </form>
            </div>
            <div className='w-full max-w-sm text-white'>
                {
                    !name
                        ? <p>Name: <span className='text-teal-500 mx-1'>Ingresa el name</span></p>
                        : <p>Name: <span className='mx-1'>{name}</span></p>
                }

                {
                    !email
                        ? <p>Email: <span className='text-teal-500 mx-1'>Ingresa el email</span></p>
                        : <p>Email: <span className='mx-1'>{email}</span></p>
                }

                {
                    !password
                        ? <p>Password: <span className='text-teal-500 mx-1'>Ingresa el password</span></p>
                        : <p>Password: <span className='mx-1'>{password}</span></p>
                }

                {
                    !confirmPassword
                        ? <p>Password: <span className='text-teal-500 mx-1'>Ingresa el Confirm password</span></p>
                        : <p>Confirm password:
                            {
                                confirmPassword === password
                                    ? <span className='mx-1 text-green-300'> Password coincide <br /> {"'" + confirmPassword + "'"}</span>
                                    : <span className='text-red-500 mx-1'>Password no coincide</span>
                            }
                        </p>
                }
            </div>
        </div>
    )
}

export default RegisterForm