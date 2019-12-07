import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type NewFormParams = {
  name: string
  title: string
}

type NewFormDoc = {
  ref: values.Ref
  data: {
    created_at: {
      value: string
    }
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { name, title }: NewFormParams = req.body
  const form = await userClient.query<NewFormDoc>(
    q.Create(q.Collection('forms'), {
      data: {
        name,
        title,
        user: q.Identity(),
        created_at: q.Now()
      }
    })
  )

  res.status(201).json({
    form: {
      ...form.data,
      user: undefined,
      id: form.ref.id,
      created_at: form.data.created_at.value,
      number_of_replies: 0
    }
  })
}
