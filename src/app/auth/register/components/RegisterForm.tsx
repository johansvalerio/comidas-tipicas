"use client"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { type UserFormData } from '@/app/types/user'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

function RegisterForm() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>()
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const onSubmit = handleSubmit(async (data: UserFormData) => {
        console.log(data)
        const res = await fetch('/api/auth/register', {
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
        console.log(resJSON)
        router.push('/auth/login')
        
       
    })

    return (
        <div className='flex flex-col min-h-screen items-center p-24 gap-3 bg-[url("/img/maiz2.png")]  bg-cover'>

            <div className="w-full max-w-sm px-4 py-6 bg-black/80 shadow-lg rounded-2xl text-black">
                <h1 className='text-xl text-white mb-3 flex justify-start items-baseline gap-1 font-medium'>Registro de usuario <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg></h1>
                <form
                    className="flex flex-col space-y-3"
                    onSubmit={onSubmit}>
                    <label htmlFor="user_name" className='font-semibold opacity-80 text-white'>Name</label>
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
                    <label htmlFor="user_email" className='font-semibold opacity-80 text-white'>Email</label>
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
                    <label htmlFor="user_password" className='font-semibold opacity-80 text-white'>Password</label>
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
                    <label htmlFor="confirmPassword" className='font-semibold opacity-80 text-white'>Confirm password</label>
                    <input
                        {...register("confirmPassword", {
                            required: true,
                            onChange: (e) => setConfirmPassword(e.target.value),
                        })}
                        type="password" id="confirmPassword" name='confirmPassword' className="rounded-md p-2.5 text-md opacity-60" placeholder="******" />
                    {
                        errors.confirmPassword && <p className='text-red-500'>Las contraseñas no coinciden</p>
                    }
                    <div className='flex justify-end items-center gap-3 pt-3 font-medium'>
                        <button type='submit' className='rounded-md p-3 text-md bg-choco-100 text-black font-semibold hover:bg-choco-50'>Crear usuario</button>
                        <a href="/auth/login" className='rounded-md p-3 font-medium text-md border border-gray-700 bg-gray-700 text-white hover:bg-gray-600 hover:border-gray-600'>Iniciar sesión</a>    
                    </div>

                </form>
            </div>
            {/* <div className='w-full max-w-sm text-white'>
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
            </div> */}

        </div>
    )
}

export default RegisterForm