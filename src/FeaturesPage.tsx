import React from 'react'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { getFeatures } from './api'
import Loading from './Loading'

const FeaturesPage: React.FC = () => {
  usePageView()
  const { data: features } = useSWR('/features', getFeatures)

  return (
    <>
      <Helmet>
        <title>Features - Feedbacky</title>
      </Helmet>

      <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
        <div className="container mx-auto px-2 md:flex">
          <h1 className="leading-tight text-2xl font-medium">Features</h1>

          <div className="ml-auto mt-2 md:mt-0">
            <Link
              to="/features/new"
              className="text-xs inline-block border border-solid border-indigo-500 text-indigo-700 hover:bg-indigo-100 rounded-full py-1 px-4 font-medium uppercase"
            >
              New feature
            </Link>
          </div>
        </div>
      </section>

      <div className="container px-2 mx-auto py-4">
        {features ? (
          features.map(feature => (
            <div
              key={feature.id}
              className="p-4 rounded-lg bg-white shadow mb-2"
            >
              <div className="flex items-baseline">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <i className="far fa-lightbulb text-indigo-500"></i>
                </div>
                <div className="items-baseline md:flex md:w-full">
                  <Link
                    to={`/features/${feature.id}`}
                    className="font-medium hover:text-indigo-500"
                  >
                    {feature.name}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loading></Loading>
        )}
      </div>
    </>
  )
}

export default FeaturesPage
