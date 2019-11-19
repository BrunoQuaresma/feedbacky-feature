import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

  if (!survey) return <div>Loading...</div>

  return (
    survey && (
      <>
        <h1 className="text-2xl mb-4">{survey.name}</h1>

        {survey.features.map(feature => (
          <div
            key={feature.id}
            className="rounded-lg bg-white shadow mb-2 md:max-w-xs md:inline-block md:w-full sm:mr-2"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium">{feature.name}</h3>
              <p className="text-sm text-gray-700 truncate">
                {feature.description}
              </p>
            </div>
            <div className="px-6 py-2 bg-gray-100 text-xs font-medium text-gray-700">
              <small className="mr-1 text-indigo-500">
                <i className="fas fa-heart"></i>
              </small>
              {feature.number_of_votes} votes
            </div>
          </div>
        ))}
      </>
    )
  )
}

export default SurveyPage
