import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type NewFeatureParams = {
  name: string
  description: string
}

type NewFeatureDoc = {
  ref: values.Ref
  data: {
    created_at: {
      value: string
    }
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(
    'fnEDcxF7uUACEgNy4F_EkAIUhajtWDo2-UMKzMJcAhiNLzShNNA'
  )
  const { name, description }: NewFeatureParams = req.body
  const feature = await userClient.query<NewFeatureDoc>(
    q.Create(q.Collection('features'), {
      data: {
        name,
        description,
        user: q.Identity(),
        created_at: q.Now()
      }
    })
  )

  res.status(201).json({
    feature: {
      ...feature.data,
      user: undefined,
      id: feature.ref.id,
      created_at: feature.data.created_at.value
    }
  })
}
