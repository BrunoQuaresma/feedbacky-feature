import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Feature } from './types'

type FeatureResponse = {
  feature: Feature
}

const FeaturePage: React.FC = () => {
  const [feature, setFeature] = useState<Feature>()
  const { id } = useParams()

  useEffect(() => {
    axios.get<FeatureResponse>(`/api/features/${id}`).then(response => {
      setFeature(response.data.feature)
    })
  }, [id])

  if (!feature) return <div>Loading...</div>

  return (
    feature && (
      <>
        <h1 className="text-2xl mb-4">{feature.name}</h1>
        <p>{feature.description}</p>
      </>
    )
  )
}

export default FeaturePage
