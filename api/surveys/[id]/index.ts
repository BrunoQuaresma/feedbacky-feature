import { NowRequest, NowResponse } from '@now/node'
import survey from './_survey'
import deleteSurvey from './_deleteSurvey'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return survey(req, res)

    case 'DELETE':
      return deleteSurvey(req, res)

    default:
      res.status(404).end()
  }
}
