import React, { useEffect } from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useHistory } from 'react-router'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import { Link } from 'react-router-dom'

type NewFeatureForm = {
  name: string
  description: string
}

const NewFeaturePage: React.FC = () => {
  usePageView()
  const { register, handleSubmit, setValue, unregister } = useForm<
    NewFeatureForm
  >()
  const history = useHistory()

  useEffect(() => {
    register({ name: 'description' })
    return () => unregister('description')
  }, [register, unregister])

  const onSubmit = async (form: NewFeatureForm) => {
    await axios.post('/api/features', form)
    history.push('/')
  }

  return (
    <>
      <Helmet>
        <title>New Feature. - Feedbacky</title>
      </Helmet>

      <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
        <div className="container mx-auto px-2 md:flex">
          <h1 className="leading-tight text-2xl font-medium">New feature</h1>
        </div>
      </section>

      <div className="container mx-auto px-2 py-4">
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

          <div className="mb-3">
            <label
              htmlFor=""
              className="block font-medium text-sm text-gray-700 mb-2"
            >
              Description
            </label>

            <SimpleMDE
              onChange={value => setValue('description', value)}
              options={{ spellChecker: false, status: false }}
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/features"
              className="border border-indigo-500 text-indigo-500 inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2 mr-2"
            >
              Cancel
            </Link>

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
