import React, { useState } from 'react'
import { Feature } from './types'
import VoteButton from './VoteButton'
import Modal from './FeatureModal'

const FeatureCard: React.FC<{
  feature: Feature
  surveyId: string
  voterId: string
  onVote: (survey: { features: Feature[] }) => void
}> = ({ feature, surveyId, voterId, onVote }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(isOpen => !isOpen)

  return (
    <>
      <div className="feature-card">
        <div className="feature-card__body">
          <h3 className="feature-card__title" onClick={toggleModal}>
            {feature.name}
          </h3>
          <p className="feature-card__description">{feature.description}</p>
        </div>
        <div className="feature-card__footer">
          <VoteButton
            feature={feature}
            voterId={voterId}
            surveyId={surveyId}
            onVote={onVote}
          ></VoteButton>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        feature={feature}
        voterId={voterId}
        surveyId={surveyId}
        onVote={onVote}
      ></Modal>
    </>
  )
}

export default FeatureCard
