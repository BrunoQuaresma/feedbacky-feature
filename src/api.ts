import axios from 'axios'
import { FeaturesResponse } from './types'

export const getFeatures = () =>
  axios
    .get<FeaturesResponse>('/api/features')
    .then(response => response.data.features)

export const deleteSurvey = (surveyId: string) =>
  axios.delete(`/api/surveys/${surveyId}`)
