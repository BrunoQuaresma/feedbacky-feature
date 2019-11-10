import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'

type NewFeatureForm = {
  name: string
  description: string
}

const NewFeaturePage: React.FC = () => {
  const { register, handleSubmit } = useForm<NewFeatureForm>()
  const history = useHistory()

  const onSubmit = async (form: NewFeatureForm) => {
    await axios.post('/api/features', form)
    history.push('/')
  }

  return (
    <>
      <h1 className="uppercase text-sm font-medium text-gray-700 mb-4">
        New Feature
      </h1>

      <div className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor=""
              className="block font-medium text-sm text-gray-700 mb-1"
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

          <div className="mb-3">
            <label
              htmlFor=""
              className="block font-medium text-sm text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              required
              name="description"
              rows={10}
              ref={register}
              className="bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button className="shadow bg-indigo-500 text-white inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2">
              Save feature
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewFeaturePage
