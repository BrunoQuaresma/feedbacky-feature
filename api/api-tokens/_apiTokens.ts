import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type ApiTokenDoc = {
  ref: values.Ref
  data: {}
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { data } = await userClient.query<values.Page<ApiTokenDoc>>(
    q.Map(
      q.Paginate(q.Match(q.Index('api_tokens_by_user'), q.Identity())),
      apiTokenRef => q.Get(apiTokenRef)
    )
  )

  const apiTokens = data.map(apiTokens => ({
    ...apiTokens.data,
    user: undefined,
    id: apiTokens.ref.id
  }))

  res.json({
    api_tokens: apiTokens
  })
}
