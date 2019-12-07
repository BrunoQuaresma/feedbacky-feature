import { NowRequest, NowResponse } from '@now/node'
import form from './_form'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return form(req, res)

    default:
      res.status(404).end()
  }
}
