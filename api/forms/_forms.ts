import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from '../_db'

type FormDoc = {
  ref: values.Ref
  data: {}
  number_of_replies: number
}

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)
  const { data } = await userClient.query<values.Page<FormDoc>>(
    q.Map(
      q.Paginate(q.Match(q.Index('forms_by_user'), q.Identity())),
      formRef =>
        q.Let(
          {
            formDoc: q.Get(formRef)
          },
          q.Merge(q.Var('formDoc'), {
            number_of_replies: q.Count(
              q.Match(q.Index('replies_by_form'), q.Var('formRef'))
            )
          })
        )
    )
  )

  const forms = data.map(form => ({
    ...form.data,
    user: undefined,
    id: form.ref.id,
    number_of_replies: form.number_of_replies
  }))

  res.json({
    forms
  })
}
