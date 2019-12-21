import React, { useMemo } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy'
import { Survey, Feature } from './types'
import sumBy from 'lodash/sumBy'
import orderBy from 'lodash/orderBy'
import Loading from './Loading'
import Helmet from 'react-helmet'
import { deleteSurvey, getVotes } from './api'
import usePageView from './usePageView'
import * as timeago from 'timeago.js'

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

const getColor = (index: number) => {
  const colors = ['teal', 'blue', 'indigo', 'purple', 'pink', 'red', 'orange']

  if (index > colors.length - 1) {
    return colors.slice(-1)[0]
  }

  return colors[index]
}

const CODE_SNIPPET = `<script src="${process.env.REACT_APP_SCRIPT_URL}/survey.js"></script>
<script>
  window.feedbacky.renderSurveys()
</script>`

const SurveyPage: React.FC = () => {
  usePageView()
  const history = useHistory()
  const clipboard = useClipboard()
  const { id } = useParams<{ id: string }>()
  const { data: survey } = useSWR([id, `/surveys/${id}`], getSurvey)
  const { data: votes } = useSWR([id, `/surveys/${id}/votes`], getVotes)
  const totalVotes = useMemo(() => (survey ? calcTotalVotes(survey) : 0), [
    survey
  ])

  const calcVotePercentage = (numberOfVotes: number) =>
    (100 * numberOfVotes) / totalVotes

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      await deleteSurvey(id)
      history.push('/')
    }
  }

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

        <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
          <div className="container mx-auto px-2 md:flex">
            <div>
              <h1 className="leading-tight text-2xl font-medium">
                {survey.name}{' '}
                <span className="text-base text-gray-700 font-normal">
                  in <Link to="/surveys">surveys</Link>
                </span>
              </h1>

              <div className="flex mt-2 text-gray-700 text-sm">
                <div className="flex items-baseline">
                  <i className="far fa-lightbulb text-sm mr-1"></i>
                  {survey.features.length} features
                </div>

                {votes && (
                  <div className="flex items-baseline ml-3">
                    <i className="far fa-heart text-sm mr-1"></i>
                    {votes.length} votes
                  </div>
                )}
              </div>
            </div>

            <div className="ml-auto mt-2 md:mt-0">
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs inline-block border border-solid border-indigo-400 text-indigo-400 hover:bg-indigo-100 rounded-full py-1 px-4 font-medium uppercase"
              >
                <i className="far fa-trash-alt mr-1"></i> Delete
              </button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-2 py-4">
          {survey.number_of_votes === 0 && (
            <section className="mb-6">
              <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
                Next steps
              </h2>

              <div className="p-6 rounded-lg bg-white shadow mb-2">
                <h3 className="text-2xl mb-4">Add this form on your website</h3>

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
            <section className="mb-4">
              <h2 className="font-medium mb-2 text-lg">Results</h2>

              <div className="rounded-lg bg-white shadow">
                <div className="p-6 py-8 pb-6">
                  {orderByNumberOfVotes(survey.features).map(
                    (feature, index) => {
                      const percentage = calcVotePercentage(
                        feature.number_of_votes
                      )
                      const isFirstResult = index === 0
                      const color = getColor(index)

                      return (
                        <div
                          className="md:flex items-center mb-2 last:mb-0"
                          key={feature.id}
                        >
                          <div
                            className={`items-baseline flex md:w-2/5 text-right mr-4 ${
                              isFirstResult ? 'font-medium' : ''
                            }`}
                          >
                            <div
                              className={`relative text-sm w-8 h-8 rounded-full flex items-center justify-center mr-3 text-${color}-500 bg-${color}-100`}
                            >
                              {index + 1}º
                              {index === 0 && (
                                <div className="absolute w-4 h-4 text-xs bottom-0 right-0 -mr-1">
                                  <i className="fas fa-trophy text-orange-400"></i>
                                </div>
                              )}
                            </div>

                            <Link to={`/features/${feature.id}`}>
                              {feature.name}
                            </Link>
                          </div>

                          <div className="md:w-3/5 flex items-center">
                            {percentage > 0 && (
                              <div
                                className={`h-2 md:h-4 rounded mr-2 bg-${color}-300`}
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
              </div>
            </section>
          )}

          <div className="container mx-auto px-2 py-4">
            <section>
              <h1 className="font-medium mb-2 text-lg">Latest votes</h1>

              {votes ? (
                votes.length > 0 ? (
                  votes.map(vote => (
                    <div
                      key={vote.id}
                      className="p-4 rounded-lg bg-white shadow mb-2"
                    >
                      <div className="flex items-baseline">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-4">
                          <i className="far fa-heart text-red-500"></i>
                        </div>
                        <div className="items-baseline md:flex md:w-full">
                          <p>
                            New vote for{' '}
                            <Link
                              to={`/features/${vote.feature.id}`}
                              className="font-medium hover:text-red-500"
                            >
                              {vote.feature.name}
                            </Link>
                          </p>

                          <span className="block md:ml-auto text-gray-600 text-sm">
                            {timeago.format(vote.voted_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-24 border border-solid border-gray-300 rounded-lg flex bg-white items-center justify-center">
                    <div className="mr-6">
                      <i className="far fa-heart text-indigo-300 text-5xl"></i>
                    </div>
                    <div>
                      <h2 className="font-medium text-2xl">No votes yet</h2>
                      <p className="text-gray-600">
                        Latest votes will be displayed here.
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <Loading></Loading>
              )}
            </section>
          </div>
        </div>
      </>
    )
  )
}

export default SurveyPage
