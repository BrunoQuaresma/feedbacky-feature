export type Feature = {
  id: string
  name: string
  description: string
}

export type Survey = {
  id: string
  name: string
  number_of_votes: number
  features: Feature[]
}

export type FeaturesResponse = {
  features: Feature[]
}

export type SurveysResponse = {
  surveys: Survey[]
}
