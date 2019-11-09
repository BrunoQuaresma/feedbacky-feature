import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import db from './_db'

type FeatureDoc = {
  ref: values.Ref
  data: {}
  votes: {
    ref: values.Ref
    data: {
      voted_at: {
        value: string
      }
    }
  }[]
}

const userId = '248510582122086932'

export default async (req: NowRequest, res: NowResponse) => {
  const { data } = await db.query<values.Page<FeatureDoc>>(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('features_by_user'),
          q.Ref(q.Collection('users'), '248510582122086932')
        )
      ),
      x =>
        q.Let(
          {
            featureDoc: q.Get(x),
            featureVotes: q.Map(
              q.Paginate(
                q.Match(
                  q.Index('votes_by_feature'),
                  q.Select(['ref'], q.Var('featureDoc'))
                )
              ),
              x => q.Get(x)
            )
          },
          q.Merge(q.Var('featureDoc'), {
            votes: q.Select(['data'], q.Var('featureVotes'))
          })
        )
    )
  )

  const features = data.map(feature => ({
    ...feature.data,
    user: undefined,
    id: feature.ref.id,
    votes: feature.votes.map(vote => ({
      ...vote.data,
      feature: undefined,
      id: vote.ref.id,
      voted_at: vote.data.voted_at.value
    }))
  }))

  res.json({
    features
  })
}
