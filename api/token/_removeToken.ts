import { NowRequest, NowResponse } from '@now/node'
import cookie from 'cookie'

const isProduction = process.env.NODE_ENV === 'production'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      secure: isProduction,
      httpOnly: true,
      path: '/',
      expires: new Date(),
      sameSite: 'strict'
    })
  )

  res.status(200).end()
}
