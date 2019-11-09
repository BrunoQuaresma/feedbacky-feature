import { Client } from 'faunadb'

export const makeClient = (
  secret: string = String(process.env.FAUNADB_SERVER_SECRET)
) => {
  return new Client({ secret })
}

export default makeClient()
