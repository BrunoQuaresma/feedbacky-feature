import React, { useState, useEffect } from 'react'
import FeatureCard from './FeatureCard'
import { fetchSurvey } from './api'
import { Feature } from './types'

type SurveyProps = {
  id: string
  voterId: string
}

const Survey: React.FC<SurveyProps> = ({ id, voterId }) => {
  const [survey, setSurvey] = useState<{
    features: Feature[]
  }>()

  useEffect(() => {
    fetchSurvey({ surveyId: id, voterId }).then(response =>
      setSurvey(response.survey)
    )
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

export default Survey
