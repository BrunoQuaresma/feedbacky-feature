import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Feature } from './types'
import useSWR from 'swr'
import Loading from './Loading'
import Helmet from 'react-helmet'
import usePageView from './usePageView'

type FeatureResponse = {
  feature: Feature
}

const getFeature = (id: string) =>
  axios
    .get<FeatureResponse>(`/api/features/${id}`)
    .then(response => response.data.feature)

const FeaturePage: React.FC = () => {
  usePageView()
  const { id } = useParams()
  const { data: feature } = useSWR([id, `/features/${id}`], getFeature)

  if (!feature)
    return (
      <>
        <Helmet>
          <title>Loading feature... - Feedbacky</title>
        </Helmet>

        <Loading></Loading>
      </>
    )

  return (
    feature && (
      <>
        <Helmet>
          <title>{feature.name} - Feedbacky</title>
        </Helmet>

        <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
          <div className="container mx-auto px-2 md:flex">
            <div>
              <h1 className="leading-tight text-2xl font-medium">
                {feature.name}{' '}
                <span className="text-base text-gray-700 font-normal">
                  in <Link to="/features">features</Link>
                </span>
              </h1>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-2 py-4">
          <p>{feature.description}</p>
        </div>
      </>
    )
  )
}

export default FeaturePage
