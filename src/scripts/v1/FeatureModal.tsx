import React from 'react'
import VoteButton from './VoteButton'
import { Feature } from './types'
import ReactMarkdown from 'react-markdown'
import Modal from '../Modal'

const FeatureModal: React.FC<{
  feature: Feature
  surveyId: string
  voterId: string
  isOpen: boolean
  onVote: (survey: { features: Feature[] }) => void
  toggle: () => void
}> = ({ feature, voterId, surveyId, onVote, isOpen, toggle }) => {
  return (
    <>
      <Modal id={feature.id} toggle={toggle} isOpen={isOpen}>
        <div className="modal__header">{feature.name}</div>
        <div className="modal__body">
          <ReactMarkdown source={feature.description} />
        </div>
        <div className="modal__footer">
          <VoteButton
            feature={feature}
            voterId={voterId}
            surveyId={surveyId}
            onVote={onVote}
          ></VoteButton>
        </div>
      </Modal>
    </>
  )
}

export default FeatureModal
