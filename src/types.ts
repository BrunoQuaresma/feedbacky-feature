export type Feature = {
  id: string
  name: string
  description: string
  number_of_votes: number
}

export type Survey = {
  id: string
  name: string
  number_of_votes: number
  features: Feature[]
}

export type Vote = {
  feature_id: string
  survey_id: string
  voted_at: string
  created_at: string
}

export type Reply = {
  id: string
  created_at: string
  content: string
  voter_id: string
  form_id: string
}

export type Form = {
  id: string
  name: string
  title: string
  number_of_replies: number
  replies?: Reply[]
}

export type Activity = { id: string } & (
  | {
      type: 'votes'
      source: Vote
    }
  | {
      type: 'replies'
      source: Reply
    }
)

export type FeaturesResponse = {
  features: Feature[]
}

export type SurveysResponse = {
  surveys: Survey[]
}

export type FormsResponse = {
  forms: Form[]
}

export type FormResponse = {
  form: Form
}
