import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type NewFeatureDoc = {
  ref: values.Ref
  data: {
    created_at: {
      value: string
    }
  }
}

const createRandom = () =>
  Math.random()
    .toString(36)
    .substr(2)
const createToken = () => [createRandom(), createRandom()].join()

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const feature = await userClient.query<NewFeatureDoc>(
    q.Create(q.Collection('features'), {
      data: {
        user: q.Identity(),
        created_at: q.Now(),
        value: createToken()
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
