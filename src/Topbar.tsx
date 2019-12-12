import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { trigger } from 'swr'
import LoadingButton from './LoadingButton'

type TopbarProps = {
  toggleSidebar: () => void
}

const removeToken = () => axios.delete('/api/token')

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
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
      <div className="container mx-auto px-2 py-3 flex items-baseline sm:py-0">
        <button
          className="p-3 px-5 -ml-3 -my-3 text-xl mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>

        <Link to="/" className="font-medium text-xl text-white">
          <i className="far fa-comment-dots mr-2"></i>feedbacky
        </Link>

        <nav className="hidden sm:block ml-16">
          <NavLink
            className="inline-block px-3 py-5 hover:text-white"
            to="/"
            isActive={(_, location) => location.pathname === '/'}
          >
            Dashboard
          </NavLink>

          <NavLink
            className="inline-block px-3 py-5 hover:text-white"
            to="/forms"
            isActive={(_, location) => location.pathname === '/forms'}
          >
            Forms
          </NavLink>

          <NavLink
            className="inline-block px-3 py-5 hover:text-white"
            to="/integrations"
            isActive={(_, location) => location.pathname === '/integrations'}
          >
            Integrations
          </NavLink>
        </nav>

        <nav className="hidden sm:block ml-auto">
          <LoadingButton
            title="Logout"
            isLoading={isLoginOut}
            onClick={handleLogout}
            color="transparent"
          >
            <i className="fas fa-power-off"></i>
          </LoadingButton>
        </nav>
      </div>
    </header>
  )
}

export default Topbar
