import React, { useMemo } from 'react'
import useSWR from 'swr'
import { useParams, Link } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy'
import Loading from './Loading'
import Helmet from 'react-helmet'
import usePageView from './usePageView'
import { getNPSForm } from './api'
import * as timeago from 'timeago.js'
import { NPSReply } from './types'

const CODE_SNIPPET = `<script src="${process.env.REACT_APP_SCRIPT_URL}/survey.js"></script>
<script>
  window.feedbacky.renderNPSForms()
</script>`

const getValueColor = (value: number) => {
  if (value > 8) {
    return 'green'
  }

  if (value > 6) {
    return 'yellow'
  }

  return 'red'
}

const getValueIcon = (value: number) => {
  if (value > 8) {
    return 'laugh'
  }

  if (value > 6) {
    return 'meh'
  }

  return 'frown'
}

const calcNPS = (replies: NPSReply[]) => {
  const values = replies.reduce(
    (values, reply) => {
      return {
        total: values.total + 1,
        promoters: reply.value > 8 ? values.promoters + 1 : values.promoters,
        detractors: reply.value < 7 ? values.detractors + 1 : values.detractors
      }
    },
    {
      total: 0,
      promoters: 0,
      detractors: 0
    }
  )

  return ((values.promoters - values.detractors) / values.total) * 100
}

const NPSFormPage: React.FC = () => {
  usePageView()
  const clipboard = useClipboard()
  const { id } = useParams<{ id: string }>()
  const { data: form } = useSWR([id, `/nps-forms/${id}`], getNPSForm)
  const numberOfVotesByValue = useMemo(() => {
    if (!form?.replies) return {}

    return form.replies.reduce(
      (value, reply) => ({
        ...value,
        [reply.value]: value[reply.value] ? value[reply.value] + 1 : 1
      }),
      {} as { [key: string]: string }
    )
  }, [form])

  console.log('->', numberOfVotesByValue)

  if (!form)
    return (
      <>
        <Helmet>
          <title>Loading NPS form... - Feedbacky</title>
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
                  in <Link to="/nps-forms">NPS forms</Link>
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
              <h3 className="text-2xl mb-4">Add NPS form on your website</h3>

              <section className="mb-4">
                <h4 className="mb-2">
                  1. Add this element where you want to display the form.
                </h4>
                <code className="p-3 rounded bg-gray-200 block text-sm text-gray-700 relative">
                  <pre>{`<div data-nps-form="${form.id}"></div>`}</pre>
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

        {form.replies && (
          <>
            <div className="container mx-auto px-2">
              <section className="py-4 flex items-center">
                <div className="bg-white p-4 pt-6 border border-green-400 rounded-lg relative mr-2">
                  <i
                    className="far fa-laugh text-green-600 text-4xl absolute bg-white top-0"
                    style={{
                      left: '50%',
                      marginLeft: '-16px',
                      marginTop: '-16px'
                    }}
                  ></i>

                  <div className="flex">
                    <div className="text-center mr-2">
                      <div className="text-green-600">10</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[10] || 0}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600">9</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[9] || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 pt-6 border border-gray-400 rounded-lg relative mr-2">
                  <i
                    className="far fa-meh text-gray-600 text-4xl absolute bg-white top-0"
                    style={{
                      left: '50%',
                      marginLeft: '-16px',
                      marginTop: '-16px'
                    }}
                  ></i>

                  <div className="flex">
                    <div className="text-center mr-2">
                      <div className="text-gray-600">8</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[8] || 0}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">7</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[7] || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 pt-6 border border-red-400 rounded-lg relative">
                  <i
                    className="far fa-frown text-red-600 text-4xl absolute bg-white top-0"
                    style={{
                      left: '50%',
                      marginLeft: '-16px',
                      marginTop: '-16px'
                    }}
                  ></i>

                  <div className="flex">
                    <div className="text-center mr-2">
                      <div className="text-red-600">6</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[6] || 0}
                      </div>
                    </div>
                    <div className="text-center mr-2">
                      <div className="text-red-600">5</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[5] || 0}
                      </div>
                    </div>
                    <div className="text-center mr-2">
                      <div className="text-red-600">4</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[4] || 0}
                      </div>
                    </div>
                    <div className="text-center mr-2">
                      <div className="text-red-600">3</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[3] || 0}
                      </div>
                    </div>
                    <div className="text-center mr-2">
                      <div className="text-red-600">2</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[2] || 0}
                      </div>
                    </div>
                    <div className="text-center mr-2">
                      <div className="text-red-600">1</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[1] || 0}
                      </div>
                    </div>
                    <div className="text-center mr-2">
                      <div className="text-red-600">0</div>
                      <div className="border p-3 border-gray-400 rounded-lg">
                        {numberOfVotesByValue[0] || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-4">
                  <i className="fas fa-equals"></i>
                </div>

                <div>
                  NPS
                  <span className="block text-6xl font-bold text-gray-700 leading-none">
                    {Math.round(calcNPS(form.replies))}
                  </span>
                </div>
              </section>
            </div>

            <section className="py-4">
              <div className="container mx-auto px-2">
                <h2 className="font-medium mb-2 text-lg">Replies</h2>

                {form.replies.length > 0 ? (
                  form.replies.map(reply => (
                    <div
                      key={reply.id}
                      className="p-4 rounded-lg bg-white shadow mb-2"
                    >
                      <div className="flex items-baseline">
                        <div
                          className={`w-8 h-8 rounded-full bg-${getValueColor(
                            reply.value
                          )}-100 flex items-center justify-center mr-4`}
                        >
                          <i
                            className={`far fa-${getValueIcon(
                              reply.value
                            )} text-${getValueColor(reply.value)}-600 text-xl`}
                          ></i>
                        </div>
                        <div className="items-baseline md:flex md:w-full">
                          <p>
                            User voted <b>{reply.value}</b>
                          </p>

                          <span className="block md:ml-auto text-gray-600 text-sm">
                            {timeago.format(reply.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-24 border border-solid border-gray-300 rounded-lg flex bg-white items-center justify-center">
                    <div className="mr-6">
                      <i className="far fa-smile text-indigo-300 text-5xl"></i>
                    </div>
                    <div>
                      <h2 className="font-medium text-2xl">No replies yet</h2>
                      <p className="text-gray-600">
                        Latest replies will be displayed here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </>
    )
  )
}

export default NPSFormPage
