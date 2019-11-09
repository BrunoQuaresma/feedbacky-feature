import { NowRequest, NowResponse } from '@now/node'
import apiTokens from './_apiTokens'
import newApiToken from './_newApiToken'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return apiTokens(req, res)

    case 'POST':
      return newApiToken(req, res)

    default:
      res.status(404).end()
  }
}
