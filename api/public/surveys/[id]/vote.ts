import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import db from '../../../_db'
import { FeatureDoc } from '../../../_types'
import { parseFeatureDoc } from '../../../_utils'

type SurveyDoc = {
  ref: values.Ref
  data: {}
  features: FeatureDoc[]
  number_of_votes: number
}

type VoteParams = {
  voter_id: string
  feature_id: string
}

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query
  const { voter_id, feature_id }: VoteParams = req.body

  if (!voter_id) {
    return res
      .status(400)
      .json({
        message: 'voter_id not found.'
      })
      .end()
  }

  const [, survey] = await db.query<[any, SurveyDoc]>([
    q.Create(q.Collection('votes'), {
      data: {
        voter_id,
        feature: q.Ref(q.Collection('features'), feature_id),
        survey: q.Ref(q.Collection('surveys'), id),
        voted_at: q.Now()
      }
    }),
    q.Let(
      {
        surveyRef: q.Ref(q.Collection('surveys'), id),
        surveyDoc: q.Get(q.Var('surveyRef'))
      },
      q.Merge(q.Var('surveyDoc'), {
        features: q.Map(
          q.Select(['data', 'features'], q.Var('surveyDoc')),
          featureRef =>
            q.Merge(q.Get(featureRef), {
              number_of_votes: q.Count(
                q.Match(
                  q.Index('votes_by_survey_and_feature'),
                  q.Var('surveyRef'),
                  featureRef
                )
              )
            })
        ),
        number_of_votes: q.Count(
          q.Match(q.Index('votes_by_survey'), q.Var('surveyRef'))
        )
      })
    )
  ])

  res.json({
    survey: {
      ...survey.data,
      user: undefined,
      id: survey.ref.id,
      features: survey.features.map(feature => ({
        ...parseFeatureDoc(feature),
        voted: true
      })),
      number_of_votes: survey.number_of_votes
    }
  })
}
