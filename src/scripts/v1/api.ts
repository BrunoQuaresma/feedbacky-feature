export const fetchSurvey = ({
  surveyId,
  voterId
}: {
  surveyId: string
  voterId: string
}) =>
  fetch(
    `${process.env.SCRIPT_URL}/api/public/surveys/${surveyId}?voter_id=${voterId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => response.json())

export const sendVote = ({
  featureId,
  surveyId,
  voterId
}: {
  surveyId: string
  featureId: string
  voterId: string
}) =>
  fetch(`${process.env.SCRIPT_URL}/api/public/surveys/${surveyId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      voter_id: voterId,
      feature_id: featureId
    })
  }).then(response => response.json())
