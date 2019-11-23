import { NowRequest, NowResponse } from '@now/node'
import { makeClient } from '../_db'
import { query as q } from 'faunadb'

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const userClient = makeClient(req.cookies.token)
    await userClient.query(q.Identity())

    res.status(200)
  } catch (error) {
    res.status(401)
  }

  res.end()
}
