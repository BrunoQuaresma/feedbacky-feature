import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import db from '../../../_db'

type Form = {
  data: {}
  ref: values.Ref
}

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id, voter_id } = req.query as { id: string; voter_id: string }

  if (!voter_id) {
    return res
      .status(400)
      .json({
        message: 'voter_id not found.'
      })
      .end()
  }

  const form = await db.query<Form>(q.Get(q.Ref(q.Collection('forms'), id)))

  res.json({
    form: {
      ...form.data,
      user: undefined,
      id: form.ref.id
    }
  })
}
