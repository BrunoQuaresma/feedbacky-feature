import React from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { trigger } from 'swr'

const removeToken = () => axios.delete('/api/token')

const Topbar: React.FC = () => {
  const history = useHistory()

  const handleLogout = async () => {
    await removeToken()
    trigger('/features')
    trigger('/surveys')
    history.push('/login')
  }

  return (
    <header className="bg-indigo-500 text-indigo-200 shadow-md">
      <div className="container mx-auto px-2 py-3 flex items-baseline sm:py-0">
        <Link to="/" className="font-medium text-xl text-white">
          feedbacky
        </Link>
        <nav className="hidden sm:block ml-4">
          <Link className="inline-block px-2 py-4 text-white" to="/">
            Dashboard
          </Link>
          <Link className="inline-block px-2 py-4" to="/integrations">
            Integrations
          </Link>
        </nav>

        <nav className="hidden sm:block ml-auto">
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </header>
  )
}

export default Topbar
