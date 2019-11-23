import { NowRequest, NowResponse } from '@now/node'
import createToken from './_createToken'
import removeToken from './_removeToken'
import verifyToken from './_verifyToken'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return verifyToken(req, res)

    case 'DELETE':
      return removeToken(req, res)

    case 'POST':
      return createToken(req, res)

    default:
      res.status(404).end()
  }
}
