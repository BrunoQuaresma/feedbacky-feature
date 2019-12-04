import React, { useMemo } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy'
import { Survey, Feature } from './types'
import sumBy from 'lodash/sumBy'
import orderBy from 'lodash/orderBy'
import Loading from './Loading'
import Helmet from 'react-helmet'

type SurveyResponse = {
  survey: Survey
}

const getSurvey = (id: string) =>
  axios
    .get<SurveyResponse>(`/api/surveys/${id}`)
    .then(response => response.data.survey)

const calcTotalVotes = (survey: Survey) =>
  sumBy(survey.features, feature => feature.number_of_votes)

const orderByNumberOfVotes = (features: Feature[]) =>
  orderBy(features, ['number_of_votes'], ['desc'])

const CODE_SNIPPET = `<script src="${process.env.REACT_APP_SCRIPT_URL}/survey.js"></script>
<script>
  window.feedbacky.renderSurveys()
</script>`

const SurveyPage: React.FC = () => {
  const clipboard = useClipboard()
  const { id } = useParams<{ id: string }>()
  const { data: survey } = useSWR([id, `/surveys/${id}`], getSurvey)
  const totalVotes = useMemo(() => (survey ? calcTotalVotes(survey) : 0), [
    survey
  ])

  const calcVotePercentage = (numberOfVotes: number) =>
    (100 * numberOfVotes) / totalVotes

  if (!survey)
    return (
      <>
        <Helmet>
          <title>Loading survey... - Feedbacky</title>
        </Helmet>
        <Loading></Loading>
      </>
    )

  return (
    survey && (
      <>
        <Helmet>
          <title>{survey.name} - Feedbacky</title>
        </Helmet>

        <h1 className="text-2xl mb-6">{survey.name}</h1>

        {survey.number_of_votes === 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
              Next steps
            </h2>

            <div className="p-6 rounded-lg bg-white shadow mb-2">
              <h3 className="text-2xl mb-4">Add this survey to your page</h3>

              <section className="mb-4">
                <h4 className="mb-2">
                  1. Add this element where you want to display the survey.
                </h4>
                <code className="p-3 rounded bg-gray-200 block text-sm text-gray-700 relative">
                  <pre>{`<div data-survey="${survey.id}"></div>`}</pre>
                  <button
                    onClick={() =>
                      clipboard.copy(`<div data-survey="${survey.id}"></div>`)
                    }
                    className="absolute right-0 bottom-0 p-3"
                  >
                    <i className="far fa-copy"></i>
                  </button>
                </code>
              </section>

              <section className="mb-4">
                <h4 className="mb-2">
                  2. Include the styles before{' '}
                  <span className="bg-gray-200 inline-block text-sm px-1 rounded text-gray-700">
                    {'</head>'}
                  </span>
                  .
                </h4>
                <code className="p-3 rounded bg-gray-200 block text-sm text-gray-700 relative">
                  <pre>{`<link rel="stylesheet" href="${process.env.REACT_APP_SCRIPT_URL}/survey.css">`}</pre>
                  <button
                    onClick={() =>
                      clipboard.copy(
                        `<link rel="stylesheet" href="${process.env.REACT_APP_SCRIPT_URL}/survey.css">`
                      )
                    }
                    className="absolute right-0 bottom-0 p-3"
                  >
                    <i className="far fa-copy"></i>
                  </button>
                </code>
              </section>

              <section className="mb-4">
                <h4 className="mb-2">
                  3. Include this script before{' '}
                  <span className="bg-gray-200 inline-block text-sm px-1 rounded text-gray-700">
                    {'</body>'}
                  </span>
                  .
                </h4>
                <code className="p-3 rounded bg-gray-200 block text-sm text-gray-700 relative">
                  <pre>{CODE_SNIPPET}</pre>
                  <button
                    onClick={() => clipboard.copy(CODE_SNIPPET)}
                    className="absolute right-0 bottom-0 p-3"
                  >
                    <i className="far fa-copy"></i>
                  </button>
                </code>
              </section>

              <section>
                <h4>4. Check if your survey is rendered right.</h4>
              </section>
            </div>
          </section>
        )}

        {survey.number_of_votes > 0 && (
          <section className="mb-8 flex -mx-2 flex-wrap">
            <div className="w-full mb-4 md:mb-0 md:w-3/5 px-2">
              <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
                Results
              </h2>

              <div className="rounded-lg bg-white shadow">
                <div className="p-6 py-8 pb-6">
                  {orderByNumberOfVotes(survey.features).map(
                    (feature, index) => {
                      const percentage = calcVotePercentage(
                        feature.number_of_votes
                      )
                      const isFirstResult = index === 0
                      const colorValue = 900 - index * 200

                      return (
                        <div
                          className="flex items-center mb-2 last:mb-0"
                          key={feature.id}
                        >
                          <div
                            className={`w-2/5 text-sm truncate text-right mr-4 ${
                              isFirstResult ? 'font-medium' : ''
                            }`}
                          >
                            {feature.name}
                          </div>

                          <div className="w-3/5 flex items-center">
                            {percentage > 0 && (
                              <div
                                className={`h-4 rounded mr-2 bg-indigo-${colorValue}`}
                                style={{
                                  width: `${percentage}%`
                                }}
                              ></div>
                            )}
                            <span className="text-sm">
                              {feature.number_of_votes}
                            </span>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>

                <div className="flex items-center bg-gray-100 p-2">
                  <div className="w-2/5 text-sm truncate text-right mr-4 font-medium">
                    Total
                  </div>

                  <div className="w-3/5 flex items-center text-sm">
                    {totalVotes}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 px-2 flex flex-col">
              <div className="mb-2 flex items-center">
                <h2 className="uppercase text-sm font-medium text-gray-700 ">
                  Analytics
                </h2>

                <span className="ml-2 inline-block bg-teal-200 font-medium uppercase rounded-full text-xs px-3 py-1 text-teal-900">
                  Coming soon{' '}
                  <span className="font-medium inline-block bg-teal-700 text-teal-100 px-2 rounded-full ml-1 -mr-2">
                    PRO
                  </span>
                </span>
              </div>

              <div className="rounded-lg border border-teal-400 p-6 text-gray-600 flex-1 flex">
                <div className="w-10 h-10 text-xl flex items-center justify-center bg-teal-200 rounded-full text-teal-700">
                  <i className="far fa-chart-bar"></i>
                </div>

                <div className="ml-4">
                  <h3 className="text-2xl font-medium">Analytics for survey</h3>
                  <p className="text-lg flex-1">
                    Analyse votes per day and specific dates.
                  </p>
                  <p className="text-sm mt-2">*Only for pro accounts</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
            Features
          </h2>

          {orderByNumberOfVotes(survey.features).map(feature => (
            <div
              key={feature.id}
              className="rounded-lg bg-white shadow mb-2 md:max-w-xs md:inline-block md:w-full sm:mr-2"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium">{feature.name}</h3>
                <p className="text-sm text-gray-700 truncate">
                  {feature.description}
                </p>
              </div>
              <div className="px-6 py-2 bg-gray-100 text-xs font-medium text-gray-700">
                <small className="mr-1 text-indigo-500">
                  <i className="fas fa-heart"></i>
                </small>
                {feature.number_of_votes} votes
              </div>
            </div>
          ))}
        </section>
      </>
    )
  )
}

export default SurveyPage
