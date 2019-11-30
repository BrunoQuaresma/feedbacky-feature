import React from 'react'

const IntegrationsPage: React.FC = () => {
  return (
    <>
      <div className="mb-4 flex">
        <h1 className="text-2xl">Integrations</h1>
      </div>

      <div className="w-full px-2 flex flex-col">
        <div className="mb-2 flex items-center">
          <h2 className="uppercase text-sm font-medium text-gray-700 ">
            Gogole Analytics
          </h2>

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
