import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import HomePage from './HomePage'
import NewFeaturePage from './NewFeaturePage'
import NewSurveyPage from './NewSurveyPage'
import IntegrationsPage from './IntegrationsPage'
import SurveyPage from './SurveyPage'
import FeaturePage from './FeaturePage'
import FormsPage from './FormsPage'
import FormPage from './FormPage'
import Topbar from './Topbar'
import Loading from './Loading'
import NewFormPage from './NewFormPage'
import Sidebar from './Sidebar'

const verifyToken = () => axios.get('/api/token')

const DashboardApp: React.FC = () => {
  // TailwindCSS https://tailwindcss.com/docs/breakpoints/#app
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 767 })
  const history = useHistory()
  const [isVerifyingToken, setIsVerifyingToken] = useState(true)
  const [isSidebarOpen, setIsOpenSidebar] = useState(false)

  useEffect(() => {
    verifyToken()
      .then(() => setIsVerifyingToken(false))
      .catch((error: AxiosError) => {
        if (error && error.response && error.response.status === 401) {
          history.push('/login')
        }
      })
  }, [history])

  const toggleSidebar = () => setIsOpenSidebar(isOpen => !isOpen)

  if (isVerifyingToken) {
    return <Loading></Loading>
  }

  return (
    <div className="h-full flex flex-col">
      <Topbar toggleSidebar={toggleSidebar} />

      {isSmallScreen && (
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      )}

      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/features/new" component={NewFeaturePage}></Route>
        <Route exact path="/features/:id" component={FeaturePage}></Route>
        <Route exact path="/surveys/new" component={NewSurveyPage}></Route>
        <Route exact path="/surveys/:id" component={SurveyPage}></Route>
        <Route exact path="/forms" component={FormsPage}></Route>
        <Route exact path="/forms/new" component={NewFormPage}></Route>
        <Route exact path="/forms/:id" component={FormPage}></Route>
        <Route exact path="/integrations" component={IntegrationsPage}></Route>
      </Switch>

      <footer className="text-center text-sm text-gray-600 mt-auto p-6">
        © 2019 feedbacky.io - Ask for help on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/feedbackyio"
          className="font-medium"
        >
          Twitter
        </a>
      </footer>
    </div>
  )
}

export default DashboardApp
