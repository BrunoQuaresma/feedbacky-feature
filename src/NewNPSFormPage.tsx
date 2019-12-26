import React from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import { Link } from 'react-router-dom'
import { trigger } from 'swr'

type NewNPSForm = {
  name: string
  question: string
}

const NewNPSFormPage: React.FC = () => {
  usePageView()
  const { register, handleSubmit } = useForm<NewNPSForm>({
    defaultValues: {
      question:
        'How likely is it that you would recommend this product to a friend or colleague?'
    }
  })

  const history = useHistory()

  const onSubmit = async (form: NewNPSForm) => {
    const response = await axios.post('/api/nps-forms', form)
    trigger('/nps-forms')
    history.push(`/nps-forms/${response.data.nps_form.id}`)
  }

  return (
    <>
      <Helmet>
        <title>New NPS Form - Feedbacky</title>
      </Helmet>

      <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
        <div className="container mx-auto px-2 md:flex">
          <h1 className="leading-tight text-2xl font-medium">New NPS form</h1>
        </div>
      </section>

      <div className="container mx-auto py-4 px-2">
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
              Question
            </label>

            <textarea
              required
              name="question"
              ref={register}
              className="bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none"
              rows={2}
            />
          </div>

          <div className="flex justify-end max-w-xl">
            <Link
              to="/nps-forms"
              className="border border-indigo-500 text-indigo-500 inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2 mr-2"
            >
              Cancel
            </Link>

            <button className="shadow bg-indigo-500 text-white inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2">
              Save NPS form
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewNPSFormPage
