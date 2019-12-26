import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type NPSFormDoc = {
  ref: values.Ref
  data: {}
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { data } = await userClient.query<values.Page<NPSFormDoc>>(
    q.Map(q.Paginate(q.Match(q.Index('nps_forms_by_user'), q.Identity())), x =>
      q.Get(x)
    )
  )

  const npsForms = data.map(form => ({
    ...form.data,
    user: undefined,
    id: form.ref.id
  }))

  res.json({
    nps_forms: npsForms
  })
}
