import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'

type SidebarProps = {
  toggle: () => void
  isOpen: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ toggle, isOpen }) => {
  // TailwindCSS https://tailwindcss.com/docs/breakpoints/#app
  const isSmallScreen = useMediaQuery({ query: '(max-device-width: 767px)' })

  const backdropTransitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const sidebarTransitions = useTransition(isOpen, null, {
    from: { transform: 'translatex(-16rem)' },
    enter: { transform: 'translatex(0)' },
    leave: { transform: 'translatex(-16rem)' }
  })

  const handleSidebarClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <>
      {backdropTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className={
                isSmallScreen
                  ? 'w-full h-full fixed z-100 top-0 left-0 backdrop'
                  : 'h-full'
              }
            >
              {sidebarTransitions.map(
                ({ item, key, props }) =>
                  item && (
                    <animated.div
                      key={key}
                      style={props}
                      className="w-64 bg-white h-full shadow-lg"
                      onClick={handleSidebarClick}
                    >
                      <div className="px-5 py-4 text-xl bg-indigo-100 text-indigo-700 relative">
                        <span>
                          <i className="far fa-comment-dots mr-2"></i>
                          feedbacky
                        </span>

                        <button
                          className="absolute text-sm w-12 h-full top-0 right-0 opacity-75 md:hidden"
                          onClick={toggle}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                      </div>

                      <nav className="mt-2">
                        <NavLink
                          className="block px-4 py-3"
                          to="/"
                          isActive={(_, location) => location.pathname === '/'}
                        >
                          <i className="fas fa-laptop mr-3 w-6 text-center text-indigo-700"></i>{' '}
                          Dashboard
                        </NavLink>

                        <NavLink
                          className="block px-4 py-3"
                          to="/forms"
                          isActive={(_, location) =>
                            location.pathname === '/forms'
                          }
                        >
                          <i className="far fa-file-alt mr-3 w-6 text-center text-indigo-700"></i>{' '}
                          Forms
                        </NavLink>

                        <NavLink
                          className="block px-4 py-3"
                          to="/integrations"
                          isActive={(_, location) =>
                            location.pathname === '/integrations'
                          }
                        >
                          <i className="fas fa-share-alt mr-3 w-6 text-center text-indigo-700"></i>{' '}
                          Integrations
                        </NavLink>
                      </nav>
                    </animated.div>
                  )
              )}
            </animated.div>
          )
      )}
    </>
  )
}

export default Sidebar
