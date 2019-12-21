import React from 'react'
import { useTransition, animated } from 'react-spring'

const Modal: React.FC<{
  id: string
  isOpen: boolean
  toggle: () => void
}> = ({ id, isOpen, toggle, children }) => {
  const backdropTransitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const modalTransitions = useTransition(isOpen, null, {
    from: { transform: 'translateY(5rem)' },
    enter: { transform: 'translateY(0)' },
    leave: { transform: 'translateY(5rem)' }
  })

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <>
      {backdropTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className="backdrop">
              {modalTransitions.map(
                ({ item, key, props }) =>
                  item && (
                    <animated.div
                      key={key}
                      style={props}
                      className="modal"
                      data-testid={`modal-${id}`}
                      onClick={handleModalClick}
                    >
                      <button
                        className="modal-close"
                        onClick={toggle}
                        data-testid={`modal-${id}-close`}
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="times"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 352 512"
                        >
                          <path
                            fill="currentColor"
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                          ></path>
                        </svg>
                      </button>
                      {children}
                    </animated.div>
                  )
              )}
            </animated.div>
          )
      )}
    </>
  )
}

export default Modal
