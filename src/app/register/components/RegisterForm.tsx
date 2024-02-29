"use client"
import { useState } from 'react'

function RegisterForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData()

        const name = event.currentTarget.fullName.value
        data.append('fullName', name)
        setName(name)

        const email = event.currentTarget.email.value
        data.append('email', email)
        setEmail(email)

        const password = event.currentTarget.password.value
        data.append('password', password)
        setPassword(password)

        const confirmPassword = event.currentTarget.confirmPassword.value
        data.append('confirmPassword', confirmPassword)
        setPassword(confirmPassword)

        console.log("fullName:" + data.get('fullName'), "Email:" + data.get('email'), "Password:" + data.get('password'), "ConfirmPassword:" + data.get('confirmPassword'))
    }

    return (
        <div className='flex flex-col min-h-screen justify-center items-center gap-3 p-4'>
            <h1 className='text-xl'>Registro de usuario</h1>
            <div className="w-full max-w-sm p-4 bg-slate-300 rounded-lg text-black">
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                    <label htmlFor="password" className='font-semibold opacity-70'>Name: </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="fullName"
                        name='fullName'
                        className="rounded-md p-2.5 text-md opacity-60" placeholder="John Doe" />
                    <label htmlFor="email" className='font-semibold opacity-70'>Email:</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name='email'
                        className="rounded-md p-2.5 text-md opacity-60"
                        placeholder="ejemplo@dominio.com" />
                    <label htmlFor="password" className='font-semibold opacity-70'>Password: </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" id="password" name='password' className="rounded-md p-2.5 text-md opacity-60" placeholder="******" />
                    <label htmlFor="confirmPassword" className='font-semibold opacity-70'>Confirm password: </label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password" id="confirmPassword" name='confirmPassword' className="rounded-md p-2.5 text-md opacity-60" placeholder="******" />
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
                                    ? <span className='mx-1 text-green-300'> Password coincide {"'" + confirmPassword + "'"}</span>
                                    : <span className='text-red-500 mx-1'>Password no coincide</span>
                            }
                        </p>
                }
            </div>
        </div>
    )
}

export default RegisterForm