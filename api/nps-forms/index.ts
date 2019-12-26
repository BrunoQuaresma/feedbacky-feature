import { NowRequest, NowResponse } from '@now/node'
import forms from './_forms'
import newForm from './_newForm'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return forms(req, res)

    case 'POST':
      return newForm(req, res)

    default:
      res.status(404).end()
  }
}
