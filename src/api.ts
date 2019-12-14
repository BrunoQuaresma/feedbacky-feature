import axios from 'axios'
import {
  FeaturesResponse,
  FormsResponse,
  FormResponse,
  SurveysResponse
} from './types'

type ActivitiesResponse = {
  activities: any[]
}

export const getFeatures = () =>
  axios
    .get<FeaturesResponse>('/api/features')
    .then(response => response.data.features)

export const getSurveys = () =>
  axios
    .get<SurveysResponse>('/api/surveys')
    .then(response => response.data.surveys)

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
