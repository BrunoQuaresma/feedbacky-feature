import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'
import { FeatureDoc } from '../_types'
import { parseFeatureDoc } from '../_utils'

type SurveyDoc = {
  ref: values.Ref
  data: {}
  features: FeatureDoc[]
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(
    'fnEDcxF7uUACEgNy4F_EkAIUhajtWDo2-UMKzMJcAhiNLzShNNA'
  )

  const { data } = await userClient.query<values.Page<SurveyDoc>>(
    q.Map(q.Paginate(q.Match(q.Index('surveys_by_user'), q.Identity())), x =>
      q.Let(
        {
          surveyDoc: q.Get(x)
        },
        q.Merge(q.Var('surveyDoc'), {
          features: q.Map(
            q.Select(['data', 'features'], q.Var('surveyDoc')),
            x => q.Get(x)
          )
        })
      )
    )
  )

  const surveys = data.map(surveys => ({
    ...surveys.data,
    user: undefined,
    id: surveys.ref.id,
    features: surveys.features.map(parseFeatureDoc)
  }))

  res.json({
    surveys
  })
}
