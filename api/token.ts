import { NowRequest, NowResponse } from '@now/node'
import { query as q } from 'faunadb'
import db from './_db'

type Credentials = {
  email: string
  password: string
}

export default async (req: NowRequest, res: NowResponse) => {
  const { email, password }: Credentials = req.body
  const { token } = await db.query(
    q.Let(
      {
        user: q.Get(q.Match(q.Index('user_by_email'), email))
      },
      {
        user: q.Var('user'),
        token: q.Login(q.Select(['ref'], q.Var('user')), {
          password
        })
      }
    )
  )

  res.json({
    token: token.secret
  })
}
