import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Feature } from './types'
import useSWR from 'swr'
import Loading from './Loading'
import Helmet from 'react-helmet'

type FeatureResponse = {
  feature: Feature
}

const getFeature = (id: string) =>
  axios
    .get<FeatureResponse>(`/api/features/${id}`)
    .then(response => response.data.feature)

const FeaturePage: React.FC = () => {
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

        <h1 className="text-2xl mb-4">{feature.name}</h1>
        <p>{feature.description}</p>
      </>
    )
  )
}

export default FeaturePage
