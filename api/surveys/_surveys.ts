import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'
import { FeatureDoc } from '../_types'
import { parseFeatureDoc } from '../_utils'

type SurveyDoc = {
  ref: values.Ref
  data: {}
  features: FeatureDoc[]
  number_of_votes: number
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(
    'fnEDcxF7uUACEgNy4F_EkAIUhajtWDo2-UMKzMJcAhiNLzShNNA'
  )

  const { data } = await userClient.query<values.Page<SurveyDoc>>(
    q.Map(
      q.Paginate(q.Match(q.Index('surveys_by_user'), q.Identity())),
      surveyRef =>
        q.Let(
          {
            surveyDoc: q.Get(surveyRef)
          },
          q.Merge(q.Var('surveyDoc'), {
            features: q.Map(
              q.Select(['data', 'features'], q.Var('surveyDoc')),
              featureRef => q.Get(featureRef)
            ),
            number_of_votes: q.Count(
              q.Match(q.Index('votes_by_survey'), surveyRef)
            )
          })
        )
    )
  )

  const surveys = data.map(surveys => ({
    ...surveys.data,
    user: undefined,
    id: surveys.ref.id,
    features: surveys.features.map(parseFeatureDoc),
    number_of_votes: surveys.number_of_votes
  }))

  res.json({
    surveys
  })
}
