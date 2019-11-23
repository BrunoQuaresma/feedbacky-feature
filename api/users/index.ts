import { NowRequest, NowResponse } from '@now/node'
import createUser from './_createUser'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'POST':
      return createUser(req, res)

    default:
      res.status(404).end()
  }
}
