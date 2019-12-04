import { NowRequest, NowResponse } from '@now/node'
import { parseFeatureDoc } from '../../../_utils'
import getSurveyData from './_getSurveyData'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id, voter_id } = req.query as { id: string; voter_id: string }

  if (!voter_id) {
    return res
      .status(400)
      .json({
        message: 'voter_id not found.'
      })
      .end()
  }

  const [survey, votes] = await getSurveyData(id, voter_id)

  res.json({
    survey: {
      ...survey.data,
      user: undefined,
      id: survey.ref.id,
      features: survey.features.map(feature => ({
        ...parseFeatureDoc(feature),
        voted: votes.data.some(vote => vote.data.feature.id === feature.ref.id)
      }))
    }
  })
}
