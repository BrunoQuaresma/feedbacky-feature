import uuid from 'uuid/v4'

const STORAGE_KEY = 'voter_id'
const blackList = ['0e3d1683-d593-5f02-bb88-1be8161536ee']

export const getOrCreateLocalVoterId = (): string => {
  let voterId = window.localStorage.getItem(STORAGE_KEY)

  if (!voterId || blackList.includes(voterId)) {
    voterId = uuid()
    window.localStorage.setItem(STORAGE_KEY, voterId)
  }

  return voterId
}
