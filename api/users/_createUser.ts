import { NowRequest, NowResponse } from '@now/node'
import { query as q } from 'faunadb'
import cookie from 'cookie'
import db from '../_db'

type Credentials = {
  email: string
  password: string
}

type Token = {
  secret: string
}

const hour = 3600000
const oneWeek = 1 * 24 * hour
const isProduction = process.env.NODE_ENV === 'production'

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const { email, password }: Credentials = req.body
    const { secret } = await db.query<Token>(
      q.Let(
        {
          user: q.Create(q.Collection('users'), {
            data: { email },
            credentials: { password }
          })
        },
        q.Login(q.Select(['ref'], q.Var('user')), {
          password
        })
      )
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', secret, {
        secure: isProduction,
        httpOnly: true,
        path: '/',
        maxAge: oneWeek,
        sameSite: 'strict'
      })
    )

    res.status(201).end()
  } catch (error) {
    if (error.requestResult) {
      switch (error.requestResult.responseContent.errors[0].code) {
        case 'instance not unique':
          return res.status(400).end()
      }
    }

    console.error(error)
    res.status(500).end()
  }
}
