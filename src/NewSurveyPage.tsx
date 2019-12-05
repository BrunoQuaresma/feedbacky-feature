import React, { useState } from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import useSWR from 'swr'
import { getFeatures } from './api'
import Helmet from 'react-helmet'

type NewSurveyForm = {
  name: string
}

const NewSurveyPage: React.FC = () => {
  const { register, handleSubmit } = useForm<NewSurveyForm>()
  const history = useHistory()
  const { data: features } = useSWR('/features', getFeatures)
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('')
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([])
  const availableFeatures = features
    ? features.filter(feature => !selectedFeatureIds.includes(feature.id))
    : []

  const onSubmit = async (form: NewSurveyForm) => {
    const { data } = await axios.post('/api/surveys', {
      ...form,
      feature_ids: selectedFeatureIds
    })
    history.push(`/surveys/${data.survey.id}`)
  }

  const unselectFeatureId = (featureId: string) => {
    setSelectedFeatureIds(ids => ids.filter(id => id !== featureId))
  }

  return (
    <>
      <Helmet>
        <title>New Survey - Feedbacky</title>
      </Helmet>

      <h1 className="uppercase text-sm font-medium text-gray-700 mb-4">
        New survey
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 max-w-xl">
          <label
            htmlFor=""
            className="block font-medium text-sm text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            required
            autoFocus
            name="name"
            type="text"
            ref={register}
            className="bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor=""
            className="block font-medium text-sm text-gray-700 mb-2"
          >
            Features
          </label>

          {features ? (
            <>
              {availableFeatures.length > 0 && (
                <div className="flex max-w-xl mb-2">
                  <div className="relative flex-1">
                    <select
                      className="appearance-none bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none"
                      value={selectedFeatureId}
                      onChange={e => {
                        const value = e.currentTarget.value

                        if (value === 'all') {
                          setSelectedFeatureIds(
                            features.map(feature => feature.id)
                          )
                          return
                        }

                        setSelectedFeatureId(value)
                      }}
                    >
                      <option value="">Select a feature</option>
                      <option value="all">All features</option>
                      {availableFeatures.map(feature => (
                        <option value={feature.id} key={feature.id}>
                          {feature.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  <button
                    className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-r focus:outline-none text-xs font-medium uppercase"
                    type="button"
                    onClick={() =>
                      setSelectedFeatureIds(ids => [...ids, selectedFeatureId])
                    }
                  >
                    Add feature
                  </button>
                </div>
              )}

              {selectedFeatureIds.map((id, index) => {
                const selectedFeature = features.find(
                  feature => feature.id === id
                )

                if (!selectedFeature) return null

                return (
                  <div
                    key={selectedFeature.id}
                    className="relative rounded-lg bg-white shadow mb-2 md:max-w-xs md:inline-block md:w-full sm:mr-2"
                  >
                    <button
                      type="button"
                      className="absolute w-8 h-8 top-0 right-0 block text-sm hover:bg-gray-100 text-gray-500"
                      onClick={() => unselectFeatureId(selectedFeature.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>

                    <div className="p-6">
                      <h3 className="text-lg font-medium">
                        {selectedFeature.name}
                      </h3>
                      <p className="text-sm text-gray-700 truncate">
                        {selectedFeature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <p>Loading features...</p>
          )}
        </div>

        <button className="shadow bg-indigo-500 text-white inline-block rounded-full py-2 px-4 text-xs font-medium uppercase mt-2">
          Save survey
        </button>
      </form>
    </>
  )
}

export default NewSurveyPage
