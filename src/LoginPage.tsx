import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'

type LoginForm = {
  email: string
  password: string
}

type TokenResponse = {
  token: string
}

const TOKEN_URL = '/api/token'

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>()

  const onSubmit = async (form: LoginForm) => {
    const response = await axios.post<TokenResponse>(TOKEN_URL, form)
    window.localStorage.setItem('token', response.data.token)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">Email</label>
        <input
          required
          name="email"
          autoComplete="username"
          type="email"
          ref={register}
        />
      </div>

      <div>
        <label htmlFor="">Password</label>
        <input
          required
          name="password"
          autoComplete="current-password"
          type="password"
          ref={register}
        />
      </div>

      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

export default LoginPage
