import { NowRequest, NowResponse } from '@now/node'
import { query as q } from 'faunadb'
import db from '../../../_db'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query as { id: string }
  const { voter_id, content } = req.body as {
    id: string
    voter_id: string
    content: string
  }

  if (!voter_id) {
    return res
      .status(400)
      .json({
        message: 'voter_id not found.'
      })
      .end()
  }

  await db.query(
    q.Create(q.Collection('replies'), {
      data: {
        content,
        voter_id,
        form: q.Ref(q.Collection('forms'), id),
        created_at: q.Now()
      }
    })
  )

  res.json(204).end()
}
