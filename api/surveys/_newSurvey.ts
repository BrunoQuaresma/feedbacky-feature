import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type NewSurveyParams = {
  name: string
  feature_ids: string[]
}

type NewSurveyDoc = {
  ref: values.Ref
  data: {
    features: values.Ref[]
    created_at: {
      value: string
    }
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { name, feature_ids }: NewSurveyParams = req.body
  const survey = await userClient.query<NewSurveyDoc>(
    q.Create(q.Collection('surveys'), {
      data: {
        name,
        features: Array.from(new Set(feature_ids)).map(id =>
          q.Ref(q.Collection('features'), id)
        ),
        user: q.Identity(),
        created_at: q.Now()
      }
    })
  )

  res.status(201).json({
    survey: {
      ...survey.data,
      user: undefined,
      id: survey.ref.id,
      created_at: survey.data.created_at.value,
      features: survey.data.features.map(ref => ref.id)
    }
  })
}
