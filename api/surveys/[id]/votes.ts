import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../../_db'
import { FeatureDoc } from '../../_types'
import { parseFeatureDoc } from '../../_utils'

type VoteDoc = {
  ref: values.Ref
  feature: FeatureDoc
  data: {
    voter_id: string
    survey: values.Ref
    voted_at: {
      value: string
    }
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { id } = req.query
  const votes = await userClient.query<values.Page<VoteDoc>>(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('last_votes_by_survey'),
          q.Ref(q.Collection('surveys'), id)
        )
      ),
      voteRef =>
        q.Let(
          {
            voteDoc: q.Get(voteRef)
          },
          q.Merge(q.Var('voteDoc'), {
            feature: q.Get(q.Select(['data', 'feature'], q.Var('voteDoc')))
          })
        )
    )
  )

  res.json({
    votes: votes.data.map(vote => ({
      ...vote.data,
      id: vote.ref.id,
      voted_at: vote.data.voted_at.value,
      feature: parseFeatureDoc(vote.feature)
    }))
  })
}
