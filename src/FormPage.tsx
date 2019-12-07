import React from 'react'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy'
import Loading from './Loading'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import { getForm } from './api'
import ReplyCard from './ReplyCard'

const CODE_SNIPPET = `<script src="${process.env.REACT_APP_SCRIPT_URL}/survey.js"></script>
<script>
  window.feedbacky.renderForms()
</script>`

const FormPage: React.FC = () => {
  usePageView()
  const clipboard = useClipboard()
  const { id } = useParams<{ id: string }>()
  const { data: form } = useSWR([id, `/forms/${id}`], getForm)

  if (!form)
    return (
      <>
        <Helmet>
          <title>Loading form... - Feedbacky</title>
        </Helmet>
        <Loading></Loading>
      </>
    )

  return (
    form && (
      <>
        <Helmet>
          <title>{form.name} - Feedbacky</title>
        </Helmet>

        <div className="mb-6">
          <h1 className="text-2xl block">{form.name}</h1>
          <div className="text-xl text-gray-700">{form.title}</div>

          {/* <button
            type="button"
            onClick={handleDelete}
            className="ml-4 text-xs inline-block border border-solid border-indigo-500 text-indigo-700 hover:bg-indigo-100 rounded-full py-1 px-4 font-medium uppercase focus:outline-none mt-2"
          >
            Delete
          </button> */}
        </div>

        {form.replies && form.replies.length === 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
              Next steps
            </h2>

            <div className="p-6 rounded-lg bg-white shadow mb-2">
              <h3 className="text-2xl mb-4">Add this form to your page</h3>

              <section className="mb-4">
                <h4 className="mb-2">
                  1. Add this element where you want to display the form.
                </h4>
                <code className="p-3 rounded bg-gray-200 block text-sm text-gray-700 relative">
                  <pre>{`<div data-form="${form.id}"></div>`}</pre>
                  <button
                    onClick={() =>
                      clipboard.copy(`<div data-form="${form.id}"></div>`)
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
                <h4>4. Check if your form is rendered right.</h4>
              </section>
            </div>
          </section>
        )}

        {form.replies && form.replies.length > 0 && (
          <section className="mb-8">
            <h2 className="uppercase text-sm font-medium text-gray-700 mb-2">
              Replies
            </h2>

            {form.replies.map(reply => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </section>
        )}
      </>
    )
  )
}

export default FormPage
