import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import Helmet from 'react-helmet'
import usePageView from './usePageView'

type NewFormForm = {
  name: string
  title: string
}

const NewFormPage: React.FC = () => {
  usePageView()
  const { register, handleSubmit } = useForm<NewFormForm>()
  const history = useHistory()

  const onSubmit = async (form: NewFormForm) => {
    await axios.post('/api/forms', form)
    history.push('/')
  }

  return (
    <>
      <Helmet>
        <title>New Form - Feedbacky</title>
      </Helmet>

      <h1 className="uppercase text-sm font-medium text-gray-700 mb-4">
        New Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 max-w-xl">
          <label
            htmlFor=""
            className="block font-medium text-sm text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            required
            autoFocus
            name="name"
            type="text"
            ref={register}
            className="bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none"
          />
        </div>

        <div className="mb-3 max-w-xl">
          <label
            htmlFor=""
            className="block font-medium text-sm text-gray-700 mb-2"
          >
            Title or question
          </label>

          <textarea
            required
            autoFocus
            name="title"
            ref={register}
            className="bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none"
            rows={2}
          />
        </div>

        <div className="flex justify-end max-w-xl">
          <button className="shadow bg-indigo-500 text-white inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2">
            Save form
          </button>
        </div>
      </form>
    </>
  )
}

export default NewFormPage
