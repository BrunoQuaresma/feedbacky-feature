import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

declare global {
  interface Window {
    feedbacky: any
  }
}

type FeedbackyConfig = {
  apiToken: string
}

type SurveyProps = {
  id: string
  token: string
}

const Survey: React.FC<SurveyProps> = ({ id, token }) => {
  const [survey, setSurvey] = useState<{
    features: {
      id: string
      name: string
      description: string
    }[]
  }>()

  useEffect(() => {
    fetch(`http://localhost:3000/api/public/survey?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => setSurvey(response.survey))
  }, [id, token])

  if (!survey) return <></>

  return (
    <>
      {survey.features.map(feature => (
        <div key={feature.id}>
          <h3>{feature.name}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </>
  )
}

window.feedbacky = {
  renderSurveys: ({ apiToken }: FeedbackyConfig) => {
    document.onreadystatechange = () => {
      if (document.readyState !== 'complete') return

      document.querySelectorAll('*[data-survey]').forEach(container => {
        const surveyId = container.getAttribute('data-survey')

        if (!surveyId) {
          throw new Error(
            `You have to set an id on "data-survey" in ${container}`
          )
        }

        ReactDOM.render(<Survey id={surveyId} token={apiToken} />, container)
      })
    }
  }
}
