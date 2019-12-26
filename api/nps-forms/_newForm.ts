import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type NewFormParams = {
  name: string
  question: string
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
  const { name, question }: NewFormParams = req.body
  const form = await userClient.query<NewFormDoc>(
    q.Create(q.Collection('nps_forms'), {
      data: {
        name,
        question,
        user: q.Identity(),
        created_at: q.Now()
      }
    })
  )

  res.status(201).json({
    nps_form: {
      ...form.data,
      user: undefined,
      id: form.ref.id,
      created_at: form.data.created_at.value
    }
  })
}
