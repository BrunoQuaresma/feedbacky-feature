import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Button from './Button'
import Input from './Input'

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
    <div className="container mx-auto">
      <div className="max-w-sm mx-auto py-10 lg:px-6">
        <div className="font-medium text-indigo-700 text-4xl text-center mb-6">
          <i className="far fa-comment-dots mr-2"></i>feedbacky
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              className="block font-medium text-sm text-gray-700 mb-2"
              htmlFor=""
            >
              Email
            </label>
            <Input
              autoFocus
              required
              name="email"
              autoComplete="username"
              type="email"
              ref={register}
            />
          </div>

          <div className="mb-3">
            <label
              className="block font-medium text-sm text-gray-700 mb-2"
              htmlFor=""
            >
              Password
            </label>
            <Input
              required
              name="password"
              autoComplete="current-password"
              type="password"
              ref={register}
            />
          </div>

          <div className="mt-4">
            <Button size="sm" block>
              Login
            </Button>
            <Link
              className="text-center mt-4 text-indigo-500 block"
              to="/register"
            >
              I don't have an account yet.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
