import { NowRequest, NowResponse } from '@now/node'
import features from './_features'
import newFeature from './_newFeature'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return features(req, res)

    case 'POST':
      return newFeature(req, res)

    default:
      res.status(404)
  }
}
