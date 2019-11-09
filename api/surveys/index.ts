import { NowRequest, NowResponse } from '@now/node'
import surveys from './_surveys'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return surveys(req, res)

    default:
      res.status(404)
  }
}
