import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Survey } from './types'

type SurveyResponse = {
  survey: Survey
}

const SurveyPage: React.FC = () => {
  const [survey, setSurvey] = useState<Survey>()
  const { id } = useParams()

  useEffect(() => {
    axios.get<SurveyResponse>(`/api/surveys/${id}`).then(response => {
      setSurvey(response.data.survey)
    })
  }, [id])

  return (
    <>
      <h1>API Tokens</h1>
      <Link to="/integrations/new">New API Token</Link>

      {!survey && <div>Loading...</div>}
      {survey &&
        survey.features.map(feature => (
          <div key={feature.id}>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
            <small>{feature.number_of_votes} votes</small>
          </div>
        ))}
    </>
  )
}

export default SurveyPage
