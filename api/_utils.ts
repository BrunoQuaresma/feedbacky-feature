import { FeatureDoc } from './_types'

export const parseFeatureDoc = (featureDoc: FeatureDoc) => {
  return {
    ...featureDoc.data,
    user: undefined,
    id: featureDoc.ref.id,
    number_of_votes: featureDoc.number_of_votes
  }
}
