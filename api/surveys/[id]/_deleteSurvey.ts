import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../../_db'
import { FeatureDoc } from '../../_types'

type SurveyDoc = {
  ref: values.Ref
  data: {}
  features: FeatureDoc[]
  number_of_votes: number
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { id } = req.query

  await userClient.query<SurveyDoc>(
    q.Delete(q.Ref(q.Collection('surveys'), id))
  )

  res.status(204).end()
}
