import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid/v5'

declare global {
  interface Window {
    feedbacky: any
  }
}

type FeedbackyConfig = {
  voterId?: string
}

type SurveyProps = {
  id: string
  voterId: string
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

const FeatureCard: React.FC<{
  feature: Feature
  surveyId: string
  voterId: string
  onVote: (survey: { features: Feature[] }) => void
}> = ({ feature, surveyId, voterId, onVote }) => {
  const [isVoting, setIsVoting] = useState(false)

  const vote = () => {
    setIsVoting(true)
    fetch(`${process.env.SCRIPT_URL}/api/public/surveys/${surveyId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        voter_id: voterId,
        feature_id: feature.id
      })
    })
      .then(response => response.json())
      .then(response => onVote(response.survey))
      .finally(() => setIsVoting(false))
  }

  return (
    <div className="feature-card">
      <div className="feature-card__body">
        <h3 className="feature-card__title">{feature.name}</h3>
        <p className="feature-card__description">{feature.description}</p>
      </div>
      <div className="feature-card__footer">
        <button
          className="feature-card__vote-button"
          disabled={feature.voted || isVoting}
          onClick={vote}
        >
          {isVoting ? (
            <svg
              style={{
                margin: 'auto',
                display: 'block',
                shapeRendering: 'auto'
              }}
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#667eea"
                stroke-width="10"
                r="35"
                stroke-dasharray="164.93361431346415 56.97787143782138"
                transform="rotate(287.888 50 50)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          ) : feature.voted ? (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="heart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              ></path>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="heart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
              ></path>
            </svg>
          )}
        </button>
        <small>{feature.number_of_votes}</small>
      </div>
    </div>
  )
}

const Survey: React.FC<SurveyProps> = ({ id, voterId }) => {
  const [survey, setSurvey] = useState<{
    features: Feature[]
  }>()

  useEffect(() => {
    fetch(
      `${process.env.SCRIPT_URL}/api/public/surveys/${id}?voter_id=${voterId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(response => setSurvey(response.survey))
  }, [id, voterId])

  if (!survey) return <></>

  return (
    <div className="features">
      {survey.features.map(feature => (
        <div className="feature-col" key={feature.id}>
          <FeatureCard
            feature={feature}
            voterId={voterId}
            surveyId={id}
            onVote={setSurvey}
          ></FeatureCard>
        </div>
      ))}
    </div>
  )
}

window.feedbacky = {
  renderSurveys: ({ voterId }: FeedbackyConfig = {}) => {
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
          <Survey id={surveyId} voterId={voterId || getVoterId()} />,
          container
        )
      })
    }
  }
}
