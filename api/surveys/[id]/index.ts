import { NowRequest, NowResponse } from '@now/node'
import survey from './_survey'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return survey(req, res)

    default:
      res.status(404).end()
  }
}
