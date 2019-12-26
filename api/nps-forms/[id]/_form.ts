import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../../_db'

type ReplyDoc = {
  ref: values.Ref
  data: {
    value: number
    created_at: {
      value: string
    }
  }
}

type FormDoc = {
  ref: values.Ref
  data: {}
  replies: {
    data: ReplyDoc[]
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { id } = req.query
  const form = await userClient.query<FormDoc>(
    q.Let(
      {
        formRef: q.Ref(q.Collection('nps_forms'), id),
        formDoc: q.Get(q.Var('formRef'))
      },
      q.Merge(q.Var('formDoc'), {
        replies: q.Map(
          q.Paginate(
            q.Match(q.Index('last_nps_replies_by_nps_form'), q.Var('formRef'))
          ),
          replyRef => q.Get(replyRef)
        )
      })
    )
  )

  res.json({
    nps_form: {
      ...form.data,
      user: undefined,
      id: form.ref.id,
      replies: form.replies.data.map(reply => ({
        ...reply.data,
        id: reply.ref.id,
        created_at: reply.data.created_at.value
      }))
    }
  })
}
