import { NowRequest, NowResponse } from '@now/node'
import { query as q } from 'faunadb'
import { makeClient } from '../../_db'
import { FeatureDoc } from '../../_types'
import { parseFeatureDoc } from '../../_utils'

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { id } = req.query
  const feature = await userClient.query<FeatureDoc>(
    q.Get(q.Ref(q.Collection('features'), id))
  )

  res.json({
    feature: parseFeatureDoc(feature)
  })
}
