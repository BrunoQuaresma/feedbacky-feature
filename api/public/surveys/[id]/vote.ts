import { NowRequest, NowResponse } from '@now/node'
import { query as q } from 'faunadb'
import db from '../../../_db'
import { parseFeatureDoc } from '../../../_utils'
import getSurveyData from './_getSurveyData'

type VoteParams = {
  voter_id: string
  feature_id: string
}

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-methods', 'POST, OPTIONS')
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query as { id: string }
  const { voter_id, feature_id }: VoteParams = req.body

  if (!voter_id) {
    return res
      .status(400)
      .json({
        message: 'voter_id not found.'
      })
      .end()
  }

  await db.query(
    q.Create(q.Collection('votes'), {
      data: {
        voter_id,
        feature: q.Ref(q.Collection('features'), feature_id),
        survey: q.Ref(q.Collection('surveys'), id),
        voted_at: q.Now()
      }
    })
  )

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
