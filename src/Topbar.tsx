import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { trigger } from 'swr'
import LoadingButton from './LoadingButton'

const removeToken = () => axios.delete('/api/token')

const Topbar: React.FC = () => {
  const history = useHistory()
  const [isLoginOut, setIsLoginOut] = useState(false)

  const handleLogout = async () => {
    setIsLoginOut(true)
    await removeToken()
    trigger('/features')
    trigger('/surveys')
    history.push('/login')
  }

  return (
    <header className="bg-indigo-700 text-indigo-200 shadow-md topbar">
      <div className="container mx-auto px-2 md:flex items-baseline">
        <Link
          to="/"
          className="font-medium text-xl text-white py-2 inline-block"
        >
          <i className="far fa-comment-dots mr-2"></i>feedbacky
        </Link>

        <nav className="-mx-2 md:ml-16 md:mr-0 whitespace-no-wrap overflow-x-auto">
          <NavLink
            className="inline-block px-3 py-3 sm:py-5 hover:text-white"
            to="/forms"
            isActive={(_, location) => location.pathname === '/forms'}
          >
            Forms
          </NavLink>

          <NavLink
            className="inline-block px-3 py-3 sm:py-5 hover:text-white"
            to="/nps-forms"
            isActive={(_, location) => location.pathname === '/nps-forms'}
          >
            NPS
          </NavLink>

          <NavLink
            className="inline-block px-3 py-3 sm:py-5 hover:text-white"
            to="/features"
            isActive={(_, location) => location.pathname === '/features'}
          >
            Features
          </NavLink>

          <NavLink
            className="inline-block px-3 py-3 sm:py-5 hover:text-white"
            to="/surveys"
            isActive={(_, location) => location.pathname === '/surveys'}
          >
            Upvote Surveys
          </NavLink>

          <NavLink
            className="inline-block px-3 py-3 sm:py-5 hover:text-white"
            to="/integrations"
            isActive={(_, location) => location.pathname === '/integrations'}
          >
            Integrations
          </NavLink>
        </nav>

        <nav className="absolute top-0 right-0 md:relative md:ml-auto">
          <LoadingButton
            title="Logout"
            isLoading={isLoginOut}
            onClick={handleLogout}
            color="transparent"
            className="h-12 w-12"
          >
            <i className="fas fa-power-off"></i>
          </LoadingButton>
        </nav>
      </div>
    </header>
  )
}

export default Topbar
