import React from 'react'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { getForms } from './api'
import CardPlaceholder from './CardPlaceholder'

const FormsPage: React.FC = () => {
  usePageView()
  const { data: forms } = useSWR('/forms', getForms)

  return (
    <>
      <Helmet>
        <title>Forms - Feedbacky</title>
      </Helmet>

      <div className="mb-4 flex items-center">
        <h1 className="text-2xl">Forms</h1>

        <div>
          <Link
            to="/forms/new"
            className="ml-4 text-xs inline-block border border-solid border-indigo-500 text-indigo-700 hover:bg-indigo-100 rounded-full py-1 px-4 font-medium uppercase"
          >
            New form
          </Link>
        </div>
      </div>

      <div className="w-full mb-2">
        {forms ? (
          forms.map(form => (
            <div
              key={form.id}
              className="p-6 py-4 rounded-lg bg-white shadow mb-2"
            >
              <Link to={`/forms/${form.id}`} className="text-lg font-medium">
                {form.name}
              </Link>
              <p className="text-sm text-gray-700">
                <i className="far fa-comments mr-1"></i>
                {form.number_of_replies} replies
              </p>
            </div>
          ))
        ) : (
          <>
            <div className="mb-2">
              <CardPlaceholder></CardPlaceholder>
            </div>
            <div className="mb-2">
              <CardPlaceholder></CardPlaceholder>
            </div>
            <div className="mb-2">
              <CardPlaceholder></CardPlaceholder>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default FormsPage
