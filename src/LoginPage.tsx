import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'

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
  const history = useHistory()

  const onSubmit = async (form: LoginForm) => {
    await axios.post<TokenResponse>(TOKEN_URL, form)
    history.push('/')
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
