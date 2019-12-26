import axios from 'axios'
import {
  FeaturesResponse,
  FormsResponse,
  FormResponse,
  SurveysResponse,
  NPSFormsResponse,
  Feature,
  NPSFormResponse
} from './types'

type ActivitiesResponse = {
  activities: any[]
}

type VotesResponse = {
  votes: { voted_at: string; feature: Feature; id: string }[]
}

export const getFeatures = () =>
  axios
    .get<FeaturesResponse>('/api/features')
    .then(response => response.data.features)

export const getSurveys = () =>
  axios
    .get<SurveysResponse>('/api/surveys')
    .then(response => response.data.surveys)

export const getVotes = (surveyId: string) =>
  axios
    .get<VotesResponse>(`/api/surveys/${surveyId}/votes`)
    .then(response => response.data.votes)

export const deleteSurvey = (surveyId: string) =>
  axios.delete(`/api/surveys/${surveyId}`)

export const getForms = () =>
  axios.get<FormsResponse>('/api/forms').then(response => response.data.forms)

export const getForm = (id: string) =>
  axios
    .get<FormResponse>(`/api/forms/${id}`)
    .then(response => response.data.form)

export const getActivities = () =>
  axios
    .get<ActivitiesResponse>('/api/activities')
    .then(response => response.data.activities)

export const getNPSForms = () =>
  axios
    .get<NPSFormsResponse>('/api/nps-forms')
    .then(response => response.data.nps_forms)

export const getNPSForm = (id: string) =>
  axios
    .get<NPSFormResponse>(`/api/nps-forms/${id}`)
    .then(response => response.data.nps_form)
