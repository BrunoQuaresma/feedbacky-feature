import { Client } from 'faunadb'

export default new Client({
  secret: String(process.env.FAUNADB_SERVER_SECRET)
})
