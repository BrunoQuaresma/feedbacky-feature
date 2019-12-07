import React, { useState } from 'react'
import { sendVote, sendUnvote } from './api'
import { Feature } from './types'

const VoteButton: React.FC<{
  feature: Feature
  surveyId: string
  voterId: string
  onVote: (survey: { features: Feature[] }) => void
}> = ({ feature, surveyId, voterId, onVote }) => {
  const [isVoting, setIsVoting] = useState(false)

  const vote = () => {
    setIsVoting(true)

    sendVote({ surveyId, voterId, featureId: feature.id })
      .then(response => onVote(response.survey))
      .finally(() => setIsVoting(false))
  }

  const unvote = () => {
    setIsVoting(true)

    sendUnvote({ surveyId, voterId, featureId: feature.id })
      .then(response => onVote(response.survey))
      .finally(() => setIsVoting(false))
  }

  const handleVoteClick = () => {
    feature.voted ? unvote() : vote()
  }

  return (
    <>
      <button
        type="button"
        data-testid={`feature-${feature.id}-button`}
        className="feature-card__vote-button"
        disabled={isVoting}
        onClick={handleVoteClick}
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
              strokeWidth="10"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
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
    </>
  )
}

export default VoteButton
