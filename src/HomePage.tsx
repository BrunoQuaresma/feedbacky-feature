import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FeaturesResponse, SurveysResponse, Feature, Survey } from './types'

const FeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>()
  const [surveys, setSurveys] = useState<Survey[]>()

  useEffect(() => {
    axios
      .get<FeaturesResponse>('/api/features')
      .then(response => setFeatures(response.data.features))

    axios
      .get<SurveysResponse>('/api/surveys')
      .then(response => setSurveys(response.data.surveys))
  }, [])

  return (
    <>
      <h1>My surveys</h1>
      <Link to="/surveys/new">New survey</Link>

      {!surveys && <div>Loading...</div>}
      {surveys &&
        surveys.map(survey => (
          <div key={survey.id}>
            <Link to={`/surveys/${survey.id}`}>
              <h3>{survey.name}</h3>
            </Link>
            <small>
              {survey.features.map(feature => feature.name).join(', ')}
            </small>
            <div>
              <small>Votes: {survey.number_of_votes}</small>
            </div>
          </div>
        ))}

      <h1>My Features</h1>
      <Link to="/features/new">New feature</Link>

      {!features && <div>Loading...</div>}
      {features &&
        features.map(feature => (
          <div key={feature.id}>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
    </>
  )
}

export default FeaturesPage
