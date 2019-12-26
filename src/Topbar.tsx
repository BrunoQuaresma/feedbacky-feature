import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { trigger } from 'swr'
import LoadingButton from './LoadingButton'

const removeToken = () => axios.delete('/api/token')

const Topbar: React.FC = () => {
  const history = useHistory()
  const [isLoginOut, setIsLoginOut] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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

        <nav className="-mx-2 md:ml-16 md:mr-0 whitespace-no-wrap">
          <button
            className="inline-block p-3 sm:py-5 hover:text-white relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="items-center">
              Surveys <i className="fas fa-caret-down ml-1 text-sm"></i>
            </span>

            {isDropdownOpen && (
              <div className="bg-white w-48 text-left shadow rounded-lg text-gray-700 absolute mt-2 -ml-2 overflow-hidden">
                <Link
                  className="block p-2 px-3 flex items-center hover:bg-red-100"
                  to="/surveys"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <i className="far fa-heart text-red-500"></i>
                  </div>
                  Upvote Surveys
                </Link>

                <Link
                  className="block p-2 px-3 flex items-center hover:bg-indigo-100"
                  to="/nps-forms"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <i className="fas fa-chart-bar text-indigo-500"></i>
                  </div>
                  NPS Surveys
                </Link>
              </div>
            )}
          </button>

          <NavLink
            className="inline-block px-3 py-3 sm:py-5 hover:text-white"
            to="/forms"
            isActive={(_, location) => location.pathname === '/forms'}
          >
            Forms
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
