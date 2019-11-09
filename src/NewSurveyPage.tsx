import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useForm from 'react-hook-form'
import { useHistory } from 'react-router'
import { Feature, FeaturesResponse } from './types'

type NewSurveyForm = {
  name: string
  feature_ids: string[]
}

const NewSurveyPage: React.FC = () => {
  const { register, handleSubmit } = useForm<NewSurveyForm>()
  const history = useHistory()
  const [features, setFeatures] = useState<Feature[]>()
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('')
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([])
  const availableFeatures = features
    ? features.filter(feature => !selectedFeatureIds.includes(feature.id))
    : []

  useEffect(() => {
    axios
      .get<FeaturesResponse>('/api/features')
      .then(response => setFeatures(response.data.features))
  }, [])

  const onSubmit = async (form: NewSurveyForm) => {
    await axios.post('/api/surveys', form)
    history.push('/')
  }

  return (
    <>
      <h1>New survey</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Name</label>
          <input required autoFocus name="name" type="text" ref={register} />
        </div>

        <h5>Features</h5>
        {features ? (
          <>
            {selectedFeatureIds.map((id, index) => {
              const selectedFeature = features.find(
                feature => feature.id === id
              )

              if (!selectedFeature) return null

              return (
                <div key={id}>
                  <div>{selectedFeature.name}</div>
                  <input
                    type="hidden"
                    name={`feature_ids[${index}]`}
                    value={selectedFeature.id}
                    ref={register}
                  />
                </div>
              )
            })}

            <select
              value={selectedFeatureId}
              onChange={e => setSelectedFeatureId(e.currentTarget.value)}
            >
              <option value="">Select a feature</option>
              {availableFeatures.map(feature => (
                <option value={feature.id} key={feature.id}>
                  {feature.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                setSelectedFeatureIds(ids => [...ids, selectedFeatureId])
              }
            >
              Add feature
            </button>
          </>
        ) : (
          <p>Loading features...</p>
        )}

        <div>
          <button>Save</button>
        </div>
      </form>
    </>
  )
}

export default NewSurveyPage
