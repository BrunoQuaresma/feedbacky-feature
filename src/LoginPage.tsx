import React, { useState } from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Input from './Input'
import LoadingButton from './LoadingButton'
import Helmet from 'react-helmet'

type LoginForm = {
  email: string
  password: string
}

type TokenResponse = {
  token: string
}

const TOKEN_URL = '/api/token'

const LoginPage: React.FC = () => {
  const { register, handleSubmit, setError, errors } = useForm<LoginForm>()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (form: LoginForm) => {
    try {
      setIsLoading(true)
      await axios.post<TokenResponse>(TOKEN_URL, form)
      history.push('/')
    } catch (error) {
      setIsLoading(false)

      if (!error.response || error.response.status !== 401) {
        throw error
      }

      setError('password', 'invalid', 'Email or password is invalid.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Login - Feedbacky</title>
      </Helmet>

      <div className="container mx-auto px-2">
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
              {errors && errors.password && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <LoadingButton size="sm" block isLoading={isLoading}>
                Login
              </LoadingButton>

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
    </>
  )
}

export default LoginPage
