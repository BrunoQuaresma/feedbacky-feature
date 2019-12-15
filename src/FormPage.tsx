import React from 'react'
import useSWR from 'swr'
import { useParams, Link } from 'react-router-dom'
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

        <section className="py-6 bg-white border-t-1 border-indigo-700 shadow mb-4">
          <div className="container mx-auto px-2 md:flex">
            <div>
              <h1 className="leading-tight text-2xl font-medium">
                {form.name}{' '}
                <span className="text-base text-gray-700 font-normal">
                  in <Link to="/forms">forms</Link>
                </span>
              </h1>

              <div className="flex mt-2 text-gray-700 text-sm">
                {form.replies && (
                  <div className="flex items-baseline">
                    <i className="far fa-comments text-sm mr-1"></i>
                    {form.replies.length} replies
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {form.replies && form.replies.length === 0 && (
          <section className="py-4 container mx-auto px-2">
            <h2 className="font-medium mb-2 text-lg">Next steps</h2>

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
          <section className="py-4">
            <div className="container mx-auto px-2">
              <h2 className="font-medium mb-2 text-lg">Replies</h2>

              {form.replies.map(reply => (
                <ReplyCard key={reply.id} reply={reply} />
              ))}
            </div>
          </section>
        )}
      </>
    )
  )
}

export default FormPage
