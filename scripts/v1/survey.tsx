import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid/v5'

declare global {
  interface Window {
    feedbacky: any
  }
}

type FeedbackyConfig = {
  apiToken: string
  voterId?: string
}

type SurveyProps = {
  id: string
  voterId: string
  token: string
}

type Feature = {
  id: string
  name: string
  description: string
  number_of_votes: number
  voted: boolean
}

const getVoterId = (): string => {
  let voterId = window.localStorage.getItem('voter_id')

  if (!voterId) {
    voterId = uuid(window.location.host, uuid.URL)
    window.localStorage.setItem('voter_id', voterId)
  }

  return voterId
}

const Survey: React.FC<SurveyProps> = ({ id, token, voterId }) => {
  const [survey, setSurvey] = useState<{
    features: Feature[]
  }>()

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/public/surveys/${id}?voter_id=${voterId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => response.json())
      .then(response => setSurvey(response.survey))
  }, [id, token, voterId])

  const vote = (feature: Feature) => {
    fetch(`http://localhost:3000/api/public/surveys/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        voter_id: voterId,
        feature_id: feature.id
      })
    })
      .then(response => response.json())
      .then(response => setSurvey(response.survey))
  }

  if (!survey) return <></>

  return (
    <>
      {survey.features.map(feature => (
        <div key={feature.id}>
          <h3>{feature.name}</h3>
          <p>{feature.description}</p>
          <div>
            <button disabled={feature.voted} onClick={() => vote(feature)}>
              {feature.voted ? 'Voted' : 'Vote'}
            </button>{' '}
            <small>{feature.number_of_votes}</small>
          </div>
        </div>
      ))}
    </>
  )
}

window.feedbacky = {
  renderSurveys: ({ apiToken, voterId }: FeedbackyConfig) => {
    document.onreadystatechange = () => {
      if (document.readyState !== 'complete') return

      document.querySelectorAll('*[data-survey]').forEach(container => {
        const surveyId = container.getAttribute('data-survey')

        if (!surveyId) {
          throw new Error(
            `You have to set an id on "data-survey" in ${container}`
          )
        }

        ReactDOM.render(
          <Survey
            id={surveyId}
            token={apiToken}
            voterId={voterId || getVoterId()}
          />,
          container
        )
      })
    }
  }
}
