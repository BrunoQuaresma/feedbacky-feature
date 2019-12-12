import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'

const usePageView = () => {
  const location = useLocation()

  useEffect(() => {
    if (process.env.REACT_APP_GA_ID && process.env.NODE_ENV === 'production') {
      ReactGA.pageview(location.pathname + location.search)
    }
  }, [location.pathname, location.search])
}

export default usePageView
