import React, { useState } from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Input from './Input'
import LoadingButton from './LoadingButton'

type LoginForm = {
  email: string
  password: string
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, setError, errors } = useForm<LoginForm>()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (form: LoginForm) => {
    try {
      setIsLoading(true)
      await axios.post('/api/users', form)
      history.push('/')
    } catch (error) {
      setIsLoading(false)

      if (!error.response || error.response.status !== 400) {
        throw error
      }

      setError('email', 'invalid', 'Email has already been taken.')
    }
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
            {errors && errors.email && (
              <p className="text-sm text-red-600 mt-2">
                {errors.email.message}
              </p>
            )}
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
              autoComplete="new-password"
              type="password"
              ref={register}
            />
          </div>

          <div className="mb-3">
            <label
              className="block font-medium text-sm text-gray-700 mb-2"
              htmlFor=""
            >
              Confirm password
            </label>
            <Input
              required
              name="confirm-password"
              type="password"
              ref={register}
              autoComplete="off"
            />
          </div>

          <div className="mt-4">
            <LoadingButton
              size="sm"
              block
              className="mt-4"
              isLoading={isLoading}
            >
              Register
            </LoadingButton>
            <Link
              className="text-center mt-4 text-indigo-500 block"
              to="/login"
            >
              I already have an account.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
