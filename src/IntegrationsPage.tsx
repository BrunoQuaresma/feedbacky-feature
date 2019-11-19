import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

type ApiToken = {
  id: string
  value: string
  name?: string
}

type ApiTokensResponse = {
  api_tokens: ApiToken[]
}

const IntegrationsPage: React.FC = () => {
  const [apiTokens, setApiTokens] = useState<ApiToken[]>()

  useEffect(() => {
    axios.get<ApiTokensResponse>('/api/api-tokens').then(response => {
      setApiTokens(response.data.api_tokens)
    })
  }, [])

  return (
    <>
      <div className="mb-4 flex">
        <h1 className="text-2xl">API Tokens</h1>
        <Link
          to="/integrations/new"
          className="ml-auto border border-solid border-indigo-500 text-indigo-700 inline-block rounded-full py-2 px-4 text-xs font-medium uppercase"
        >
          New API Token
        </Link>
      </div>

      {!apiTokens && <div>Loading...</div>}

      {apiTokens &&
        apiTokens.map(token => (
          <div key={token.id} className="rounded-lg bg-white shadow mb-2">
            <div className="p-3 px-4">
              <h3 className="text-sm text-gray-700">{token.name}</h3>
              <p className="text-lg font-medium">{token.value}</p>
            </div>
          </div>
        ))}
    </>
  )
}

export default IntegrationsPage
