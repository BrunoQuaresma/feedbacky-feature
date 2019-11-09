import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Features = {
  id: string
  name: string
  description: string
  votes: {}[]
}

type FeaturesResponse = {
  features: Features[]
}

const FeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<Features[]>()

  useEffect(() => {
    axios
      .get<FeaturesResponse>('/api/features')
      .then(response => setFeatures(response.data.features))
  }, [])

  return (
    <>
      <h1>My Features</h1>
      {!features && <div>Loading...</div>}
      {features &&
        features.map(feature => (
          <div key={feature.id}>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
            <p>Votes: {feature.votes.length}</p>
          </div>
        ))}
    </>
  )
}

export default FeaturesPage
