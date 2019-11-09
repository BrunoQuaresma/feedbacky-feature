import { NowRequest, NowResponse } from '@now/node'
import surveys from './_surveys'
import newSurvey from './_newSurvey'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return surveys(req, res)

    case 'POST':
      return newSurvey(req, res)

    default:
      res.status(404).end()
  }
}
