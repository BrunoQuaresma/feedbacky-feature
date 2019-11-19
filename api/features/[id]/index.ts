import { NowRequest, NowResponse } from '@now/node'
import feature from './_feature'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return feature(req, res)

    default:
      res.status(404).end()
  }
}
