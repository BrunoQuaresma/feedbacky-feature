import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SurveysResponse } from './types'
import CardPlaceholder from './CardPlaceholder'
import useSWR from 'swr'
import { getFeatures } from './api'

const getSurveys = () =>
  axios
    .get<SurveysResponse>('/api/surveys')
    .then(response => response.data.surveys)

const FeaturesPage: React.FC = () => {
  const { data: features } = useSWR('/features', getFeatures)
  const { data: surveys } = useSWR('/surveys', getSurveys)

  return (
    <>
      <section className="mb-8">
        <h1 className="uppercase text-sm font-medium text-gray-700 mb-2">
          Features
        </h1>

        {!features && (
          <>
            <CardPlaceholder></CardPlaceholder>
            <CardPlaceholder></CardPlaceholder>
            <CardPlaceholder></CardPlaceholder>
          </>
        )}

        <div>
          {features &&
            features.map(feature => (
              <div
                key={feature.id}
                className="p-6 rounded-lg bg-white shadow mb-2 md:max-w-xs md:inline-block md:w-full sm:mr-2"
              >
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
            ))}
        </div>

        <Link
          to="/features/new"
          className="shadow bg-indigo-500 text-white inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2"
        >
          New feature
        </Link>
      </section>

      <section>
        <h1 className="uppercase text-sm font-medium text-gray-700 mb-2">
          Surveys
        </h1>

        {!surveys && (
          <>
            <CardPlaceholder></CardPlaceholder>
            <CardPlaceholder></CardPlaceholder>
            <CardPlaceholder></CardPlaceholder>
          </>
        )}

        <div>
          {surveys &&
            surveys.map(survey => (
              <div
                key={survey.id}
                className="rounded-lg bg-white shadow mb-2 md:max-w-xs md:inline-block md:w-full sm:mr-2"
              >
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
            ))}
        </div>

        <Link
          className="border border-solid border-indigo-500 text-indigo-700 inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2"
          to="/surveys/new"
        >
          New survey
        </Link>
      </section>
    </>
  )
}

export default FeaturesPage
