"use client"
import { useState } from 'react'

function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const data = new FormData()

    const email = event.currentTarget.email.value
    data.append('email', email)
    setEmail(email)

    const password = event.currentTarget.password.value
    data.append('password', password)
    setPassword(password)

    console.log("Email:" + data.get('email'), "Password:" + data.get('password'))
  }

  return (
    <div className='flex flex-col min-h-screen justify-center items-center gap-3 p-4'>
      <h1 className='text-xl'>Inicio de sesión</h1>
      <div className="w-full max-w-sm p-4 bg-slate-300 rounded-lg text-black">
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
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
          <hr />
          <button type='submit' className='rounded-md p-2.5 text-md bg-gray-900 text-white hover:bg-gray-800'>Iniciar sesión</button>
        </form>
      </div>
      <div className='w-full max-w-sm text-white'>
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
      </div>
    </div>
  )
}

export default LoginForm