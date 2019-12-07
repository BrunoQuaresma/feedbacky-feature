import axios from 'axios'
import { FeaturesResponse, FormsResponse, FormResponse } from './types'

export const getFeatures = () =>
  axios
    .get<FeaturesResponse>('/api/features')
    .then(response => response.data.features)

export const deleteSurvey = (surveyId: string) =>
  axios.delete(`/api/surveys/${surveyId}`)

export const getForms = () =>
  axios.get<FormsResponse>('/api/forms').then(response => response.data.forms)

export const getForm = (id: string) =>
  axios
    .get<FormResponse>(`/api/forms/${id}`)
    .then(response => response.data.form)
