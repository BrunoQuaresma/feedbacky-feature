import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'
import { FeatureDoc } from '../_types'
import { parseFeatureDoc } from '../_utils'

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { data } = await userClient.query<values.Page<FeatureDoc>>(
    q.Map(q.Paginate(q.Match(q.Index('features_by_user'), q.Identity())), x =>
      q.Get(x)
    )
  )

  res.json({ features: data.map(parseFeatureDoc) })
}
