import React from 'react'
import { Link } from 'react-router-dom'
import { Activity } from './types'
import useSWR from 'swr'
import { getFeatures, getActivities, getSurveys, getForms } from './api'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import Loading from './Loading'
import * as timeago from 'timeago.js'

const FeaturesPage: React.FC = () => {
  usePageView()

  const { data: features } = useSWR(['/features'], getFeatures)
  const { data: surveys } = useSWR(['/surveys'], getSurveys)
  const { data: forms } = useSWR(['/forms'], getForms)
  const { data: activities } = useSWR<Activity[]>(
    ['/activities'],
    getActivities
  )

  return (
    <>
      <Helmet>
        <title>Dashboard - Feedbacky</title>
      </Helmet>

      <section className="hidden md:block py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
        <div className="container mx-auto px-2">
          <div className="flex -mx-2">
            <div className="px-2 w-1/3">
              <Link
                to="/forms/new"
                className="p-6 border border-solid border-gray-300 rounded-lg flex hover:border-indigo-500"
              >
                <div className="mr-4">
                  <i className="far fa-file-alt text-indigo-500 text-xl"></i>
                </div>
                <div>
                  <h2 className="font-medium mb-1">Create form</h2>
                  <p className="text-gray-600 text-sm">
                    Create forms to collect feedback. It can be used to get
                    general suggestions or for specific topics.
                  </p>
                  <span className="block text-sm font-medium text-indigo-500 mt-2">
                    <i className="fas fa-arrow-right text-xs mr-2"></i>Create
                  </span>
                </div>
              </Link>
            </div>

            <div className="px-2 w-1/3">
              <Link
                to="/features/new"
                className="p-6 border border-solid border-gray-300 rounded-lg flex hover:border-indigo-500"
              >
                <div className="mr-4">
                  <i className="far fa-lightbulb text-indigo-500 text-xl"></i>
                </div>
                <div>
                  <h2 className="font-medium mb-1">Create feature</h2>
                  <p className="text-gray-600 text-sm">
                    Create the next features that you want to release or
                    features that you want to validate with your audience.
                  </p>
                  <span className="block text-sm font-medium text-indigo-500 mt-2">
                    <i className="fas fa-arrow-right text-xs mr-2"></i>Create
                  </span>
                </div>
              </Link>
            </div>

            <div className="px-2 w-1/3">
              <Link
                to="/surveys/new"
                className="p-6 border border-solid border-gray-300 rounded-lg flex hover:border-indigo-500"
              >
                <div className="mr-4">
                  <i className="far fa-heart text-indigo-500 text-xl"></i>
                </div>
                <div>
                  <h2 className="font-medium mb-1">Create upvote survey</h2>
                  <p className="text-gray-600 text-sm">
                    Create upvote surveys to know what features are mostly
                    wanted from your audience.
                  </p>
                  <span className="block text-sm font-medium text-indigo-500 mt-2">
                    <i className="fas fa-arrow-right text-xs mr-2"></i>Create
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-2 py-4">
        <section>
          <h1 className="font-medium mb-2 text-lg">Last activities</h1>

          {features && surveys && forms && activities ? (
            activities.length > 0 ? (
              activities.map(activity => (
                <div
                  key={activity.id}
                  className="p-4 rounded-lg bg-white shadow mb-2"
                >
                  {activity.type === 'replies' && (
                    <div className="flex items-baseline">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <i className="far fa-comment text-indigo-500"></i>
                      </div>
                      <div className="items-baseline md:flex md:w-full">
                        <p>
                          Reply on{' '}
                          <Link
                            to={`/forms/${activity.source.form_id}`}
                            className="font-medium hover:text-indigo-500"
                          >
                            {
                              forms.find(
                                form => form.id === activity.source.form_id
                              )?.name
                            }
                          </Link>
                        </p>

                        <span className="block md:ml-auto text-gray-600 text-sm">
                          {timeago.format(activity.source.created_at)}
                        </span>
                      </div>
                    </div>
                  )}

                  {activity.type === 'votes' && (
                    <div className="flex items-baseline">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-4">
                        <i className="far fa-heart text-red-500"></i>
                      </div>
                      <div className="items-baseline md:flex md:w-full">
                        <p>
                          New vote on{' '}
                          <Link
                            to={`/surveys/${activity.source.survey_id}`}
                            className="font-medium hover:text-red-500"
                          >
                            {
                              surveys.find(
                                survey =>
                                  survey.id === activity.source.survey_id
                              )?.name
                            }
                          </Link>{' '}
                          for{' '}
                          <Link
                            to={`/features/${activity.source.feature_id}`}
                            className="font-medium hover:text-red-500"
                          >
                            {
                              features.find(
                                feature =>
                                  feature.id === activity.source.feature_id
                              )?.name
                            }
                          </Link>
                        </p>
                        <span className="block md:ml-auto text-gray-600 text-sm">
                          {timeago.format(activity.source.created_at)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-24 border border-solid border-gray-300 rounded-lg flex bg-white items-center justify-center">
                <div className="mr-6">
                  <i className="far fa-comments text-indigo-300 text-5xl"></i>
                </div>
                <div>
                  <h2 className="font-medium text-2xl">No activities yet</h2>
                  <p className="text-gray-600">
                    Newest activities will be displayed here.
                  </p>
                </div>
              </div>
            )
          ) : (
            <Loading></Loading>
          )}
        </section>
      </div>
    </>
  )
}

export default FeaturesPage
