import React from 'react'
import ReactDOM from 'react-dom'
import { getOrCreateLocalVoterId } from './utils'
import Survey from './Survey'
import Form from './Form'

declare global {
  interface Window {
    feedbacky: any
  }
}

type FeedbackyConfig = {
  voterId?: string
  container?: Document
}

export type Feature = {
  id: string
  name: string
  description: string
  number_of_votes: number
  voted: boolean
}

window.feedbacky = {
  renderSurveys: ({ voterId, container = document }: FeedbackyConfig = {}) => {
    container.querySelectorAll('*[data-survey]').forEach(surveyElement => {
      const surveyId = surveyElement.getAttribute('data-survey')

      if (!surveyId) {
        throw new Error(
          `You have to set an id on "data-survey" in ${surveyElement}`
        )
      }

      ReactDOM.render(
        <Survey id={surveyId} voterId={voterId || getOrCreateLocalVoterId()} />,
        surveyElement
      )
    })
  },

  renderForms: ({ voterId, container = document }: FeedbackyConfig = {}) => {
    container.querySelectorAll('*[data-form]').forEach(formElement => {
      const formId = formElement.getAttribute('data-form')

      if (!formId) {
        throw new Error(
          `You have to set an id on "data-form" in ${formElement}`
        )
      }

      ReactDOM.render(
        <Form id={formId} voterId={voterId || getOrCreateLocalVoterId()} />,
        formElement
      )
    })
  }
}
