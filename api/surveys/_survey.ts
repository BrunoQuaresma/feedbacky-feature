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
  const userClient = makeClient(req.cookies.token)
  const { id } = req.query
  const survey = await userClient.query<SurveyDoc>(
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
  )

  res.json({
    survey: {
      ...survey.data,
      user: undefined,
      id: survey.ref.id,
      features: survey.features.map(parseFeatureDoc),
      number_of_votes: survey.number_of_votes
    }
  })
}
