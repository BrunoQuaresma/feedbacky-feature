import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

type ApiToken = {
  id: string
  value: string
  description?: string
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
      <h1>API Tokens</h1>
      <Link to="/integrations/new">New API Token</Link>

      {!apiTokens && <div>Loading...</div>}
      {apiTokens &&
        apiTokens.map(token => (
          <div key={token.id}>
            <h3>{token.value}</h3>
            <p>{token.description}</p>
          </div>
        ))}
    </>
  )
}

export default IntegrationsPage
