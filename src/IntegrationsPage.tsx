import React from 'react'
import Helmet from 'react-helmet'
import usePageView from './usePageView'

const IntegrationsPage: React.FC = () => {
  usePageView()

  return (
    <>
      <Helmet>
        <title>Integrations - Feedbacky</title>
      </Helmet>

      <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
        <div className="container mx-auto px-2 md:flex">
          <h1 className="leading-tight text-2xl font-medium">Integrations</h1>
        </div>
      </section>

      <div className="container mx-auto px-2 py-4 flex flex-col">
        <div className="mb-2 flex items-center">
          <h2 className="font-medium text-lg">Google Analytics</h2>

          <span className="ml-2 inline-block bg-teal-200 font-medium uppercase rounded-full text-xs px-3 py-1 text-teal-900">
            Coming soon{' '}
            <span className="font-medium inline-block bg-teal-700 text-teal-100 px-2 rounded-full ml-1 -mr-2">
              PRO
            </span>
          </span>
        </div>

        <div className="rounded-lg border border-teal-400 p-6 text-gray-600 flex-1 flex">
          <div className="w-10 h-10 text-xl flex items-center justify-center bg-teal-200 rounded-full text-teal-700">
            <i className="far fa-chart-bar"></i>
          </div>

          <div className="ml-4">
            <h3 className="text-2xl font-medium">
              Send custom events to Google Analytics
            </h3>
            <p className="text-lg flex-1">
              Receive vote events, unvotes and survey views.
            </p>
            <p className="text-sm mt-2">*Only for pro accounts</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default IntegrationsPage
