import { values } from 'faunadb'

export type FeatureDoc = {
  ref: values.Ref
  data: {}
  number_of_votes?: number
}

export type ReplyDoc = {
  ref: values.Ref
  data: {}
}
