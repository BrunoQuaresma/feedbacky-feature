import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy'
import axios from 'axios'
import { Survey } from './types'

type SurveyResponse = {
  survey: Survey
}

const CODE_SNIPPET = `<script src="https://feedbacky.io/scripts/survey.js"></script>
<script>
  window.feedbacky.renderSurveys()
</script>`

const SurveyPage: React.FC = () => {
  const clipboard = useClipboard()
  const [survey, setSurvey] = useState<Survey>()
  const { id } = useParams()

  useEffect(() => {
    axios.get<SurveyResponse>(`/api/surveys/${id}`).then(response => {
      setSurvey(response.data.survey)
    })
  }, [id])

  if (!survey) return <div>Loading...</div>

  return (
    survey && (
      <>
        <h1 className="text-2xl mb-6">{survey.name}</h1>

        {survey.number_of_votes === 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
              Next steps
            </h2>

            <div className="p-6 rounded-lg bg-white shadow mb-2">
              <h3 className="text-2xl mb-4">Add this survey to your page</h3>

              <section className="mb-4">
                <h4 className="mb-1">
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
                <h4 className="mb-1">
                  2. Include this script before{' '}
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
                <h4 className="mb-1">
                  3. Check if your survey is rendered right.
                </h4>
              </section>
            </div>
          </section>
        )}

        <section>
          <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
            Features
          </h2>

          {survey.features.map(feature => (
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
