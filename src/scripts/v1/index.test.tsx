import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react'
import './'

describe('Public V1 Script', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('it should render the features', async () => {
    fetchMock.once(
      JSON.stringify({
        survey: {
          features: [
            {
              id: '1',
              name: 'Feature A',
              description: 'Feature A description',
              number_of_votes: 3,
              voted: false
            },
            {
              id: '2',
              name: 'Feature X',
              description: 'Feature X description',
              number_of_votes: 98,
              voted: false
            }
          ]
        }
      })
    )

    const { container, findByText } = render(
      <div data-survey="249838633272476178"></div>
    )

    window.feedbacky.renderSurveys({ container })

    await findByText('Feature A')
    await findByText('Feature A description')
    await findByText('3')

    await findByText('Feature X')
    await findByText('Feature X description')
    await findByText('98')
  })

  test('it should vote a feature', async () => {
    fetchMock
      .once(
        JSON.stringify({
          survey: {
            features: [
              {
                id: '1',
                name: 'Feature A',
                description: 'Feature A description',
                number_of_votes: 3,
                voted: false
              }
            ]
          }
        })
      )
      .once(
        // After vote the API returns the survey with updated values.
        JSON.stringify({
          survey: {
            features: [
              {
                id: '1',
                name: 'Feature A',
                description: 'Feature A description',
                number_of_votes: 4, // From 3 to 4 votes after voting
                voted: false
              }
            ]
          }
        })
      )

    const { container, findByText, getByTestId } = render(
      <div data-survey="249838633272476178"></div>
    )

    window.feedbacky.renderSurveys({ container })

    await findByText('Feature A')
    const voteButton = getByTestId('feature-1-button')
    fireEvent.click(voteButton)

    await findByText('4')
  })

  test('it should unvote a feature', async () => {
    fetchMock
      .once(
        JSON.stringify({
          survey: {
            features: [
              {
                id: '1',
                name: 'Feature A',
                description: 'Feature A description',
                number_of_votes: 3,
                voted: true
              }
            ]
          }
        })
      )
      .once(
        // After vote the API returns the survey with updated values.
        JSON.stringify({
          survey: {
            features: [
              {
                id: '1',
                name: 'Feature A',
                description: 'Feature A description',
                number_of_votes: 2, // From 3 to 2 votes after unvoting
                voted: false
              }
            ]
          }
        })
      )

    const { container, findByText, getByTestId } = render(
      <div data-survey="249838633272476178"></div>
    )

    window.feedbacky.renderSurveys({ container })

    await findByText('Feature A')
    const unvoteButton = getByTestId('feature-1-button')
    fireEvent.click(unvoteButton)

    await findByText('2')
  })

  test('it should open and close the feature modal', async () => {
    fetchMock.once(
      JSON.stringify({
        survey: {
          features: [
            {
              id: '1',
              name: 'Feature A',
              description: 'Feature A description',
              number_of_votes: 3,
              voted: true
            }
          ]
        }
      })
    )

    const {
      container,
      findByText,
      getByText,
      findByTestId,
      getByTestId,
      queryByTestId
    } = render(<div data-survey="249838633272476178"></div>)

    window.feedbacky.renderSurveys({ container })

    await findByText('Feature A')
    const featureTitle = getByText('Feature A')
    fireEvent.click(featureTitle)
    await findByTestId('modal-feature-1')

    const closeButton = getByTestId('modal-feature-1-close')
    fireEvent.click(closeButton)
    await waitForElementToBeRemoved(() => queryByTestId('modal-feature-1'))
  })
})
