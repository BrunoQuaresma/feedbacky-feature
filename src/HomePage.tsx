import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SurveysResponse } from './types'
import CardPlaceholder from './CardPlaceholder'
import useSWR from 'swr'
import { getFeatures } from './api'
import LinkButton from './LinkButton'
import Helmet from 'react-helmet'
import usePageView from './usePageView'

const getSurveys = () =>
  axios
    .get<SurveysResponse>('/api/surveys')
    .then(response => response.data.surveys)

const FeaturesPage: React.FC = () => {
  usePageView()
  const { data: features } = useSWR('/features', getFeatures)
  const { data: surveys } = useSWR('/surveys', getSurveys)

  return (
    <>
      <Helmet>
        <title>Dashboard - Feedbacky</title>
      </Helmet>

      <section className="mb-8">
        <h1 className="uppercase text-sm font-medium text-gray-700 mb-2">
          Features
        </h1>

        {!features && (
          <div className="flex flex-wrap -mx-1">
            <div className="px-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
              <CardPlaceholder></CardPlaceholder>
            </div>
            <div className="px-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
              <CardPlaceholder></CardPlaceholder>
            </div>
            <div className="px-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
              <CardPlaceholder></CardPlaceholder>
            </div>
          </div>
        )}

        {features && features.length === 0 && (
          <div className="rounded-lg border border-indigo-400 p-6 text-gray-600 flex-1 flex max-w-4xl">
            <div className="w-10 h-10 text-xl flex items-center justify-center bg-indigo-200 rounded-full text-indigo-700">
              <i className="fas fa-box-open"></i>
            </div>

            <div className="ml-4">
              <h3 className="text-2xl font-medium">
                Create your first feature
              </h3>
              <p className="text-lg flex-1">
                Create your first feature to start to create new surveys and
                track your user preferences.
              </p>

              <LinkButton to="/features/new" className="mt-2">
                Create feature
              </LinkButton>
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-1">
          {features &&
            features.map(feature => (
              <div
                className="px-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2"
                key={feature.id}
              >
                <div className="p-6 rounded-lg bg-white shadow h-full">
                  <Link
                    to={`/features/${feature.id}`}
                    className="text-lg font-medium"
                  >
                    {feature.name}
                  </Link>
                  <p className="text-sm text-gray-700 truncate">
                    {feature.description || 'No description provided'}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {features && features.length > 0 && (
          <LinkButton to="/features/new" className="mt-2">
            New feature
          </LinkButton>
        )}
      </section>

      {features && features.length > 0 && (
        <section>
          <h1 className="uppercase text-sm font-medium text-gray-700 mb-2">
            Surveys
          </h1>

          {features.length < 2 && (
            <div className="rounded-lg border border-indigo-400 p-6 text-gray-600 flex-1 flex max-w-4xl">
              <div className="w-10 h-10 text-xl flex items-center justify-center bg-indigo-200 rounded-full text-indigo-700">
                <i className="fas fa-box-open"></i>
              </div>

              <div className="ml-4">
                <h3 className="text-2xl font-medium">Almost there!</h3>
                <p className="text-lg flex-1">
                  To create your first survey you need to have two features at
                  least.
                </p>
                <LinkButton to="/features/new" className="mt-2">
                  Create feature
                </LinkButton>
              </div>
            </div>
          )}

          {features.length > 1 && surveys && (
            <>
              {surveys.length === 0 && (
                <div className="rounded-lg border border-indigo-400 p-6 text-gray-600 flex-1 flex max-w-4xl">
                  <div className="w-10 h-10 text-xl flex items-center justify-center bg-indigo-200 rounded-full text-indigo-700">
                    <i className="fas fa-clipboard-list"></i>
                  </div>

                  <div className="ml-4">
                    <h3 className="text-2xl font-medium">
                      Create your first survey
                    </h3>
                    <p className="text-lg flex-1">
                      Create your first survey to track your user preferences.
                    </p>

                    <LinkButton outline to="/surveys/new" className="mt-2">
                      Create survey
                    </LinkButton>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap -mx-1">
                {surveys.map(survey => (
                  <div
                    className="px-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2"
                    key={survey.id}
                  >
                    <div className="rounded-lg bg-white shadow h-full">
                      <div className="p-6">
                        <Link
                          className="text-lg font-medium mb-2 block"
                          to={`/surveys/${survey.id}`}
                        >
                          {survey.name}
                        </Link>

                        <div className="truncate">
                          {survey.features.map(feature => (
                            <div
                              key={feature.id}
                              className="bg-indigo-100 text-white inline-block text-indigo-700 text-xs font-medium px-2 py-1 rounded mb-1 mr-1"
                            >
                              {feature.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="px-6 py-2 bg-gray-100 text-xs font-medium text-gray-700">
                        <small className="mr-1 text-indigo-500">
                          <i className="fas fa-heart"></i>
                        </small>
                        {survey.number_of_votes} votes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {surveys && surveys.length > 0 && (
            <LinkButton outline to="/surveys/new" className="mt-2">
              New survey
            </LinkButton>
          )}
        </section>
      )}
    </>
  )
}

export default FeaturesPage
