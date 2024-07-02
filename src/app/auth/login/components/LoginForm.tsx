"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData()

    const email = event.currentTarget.email.value
    data.append('email', email)
    setEmail(email)

    const password = event.currentTarget.password.value
    data.append('password', password)
    setPassword(password)

    console.log("Email:" + data.get('email'), "Password:" + data.get('password'))

    const res = await signIn('credentials', {
      redirect: false,
      email: data.get('email'),
      password: data.get('password'),

    })

    console.log(res)
    if (res?.error) {
      console.log("Error al iniciar sesión")
      setError(res.error)
      router.push('/auth/login')
      router.refresh()
    }
    else {
      console.log("Iniciando sesión")
      router.push('/')
      router.refresh()
    }

  }

  return (
    <div className='flex flex-col h-screen justify-center items-end gap-3 p-24 bg-[url("/img/maiz3.jpg")] 
    bg-cover'>
      
      <div className="w-full max-w-sm px-4 py-6 bg-black/80 shadow-lg rounded-2xl text-black">
      <h1 className='text-xl text-white mb-3 flex justify-start items-baseline gap-1 font-medium'>Inicio de sesión
      <svg  xmlns="http://www.w3.org/2000/svg"  width="26"  height="26"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" /></svg>
      </h1>
        <form className="flex flex-col space-y-3 " onSubmit={handleSubmit}>
          <label htmlFor="email" className='font-semibold opacity-80 text-white'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name='email'
            className="rounded-md p-2.5 text-md opacity-70 placeholder-slate-400"
            placeholder="ejemplo@dominio.com" />
          <label htmlFor="password" className='font-semibold opacity-80 text-white'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password" id="password" name='password' className="rounded-md p-2.5 text-md opacity-70 placeholder-slate-400" placeholder="******" />
          {
            error && <p className='text-red-500'>{error}</p>
          }
          <div className='flex flex-col justify-center items-center gap-3 pt-3 font-medium'>
          <button type='submit' className='w-full text-center rounded-md p-3 text-md font-medium border border-slate-700 bg-slate-700 text-white hover:bg-slate-600 hover:border-bg-slate-600'>
          Iniciar sesión</button>
          <div className='flex justify-center gap-1 items-center'> <p className='text-white'>¿No tienes cuenta?</p>
          <a href="/auth/register" className='text-amber-500 underline'>  Registrate aqui</a>
          </div>
         
          </div>
          
        </form>
      </div>
      {/* <div className='w-full max-w-sm text-white'>
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
      </div> */}
    </div>
  )
}

export default LoginForm