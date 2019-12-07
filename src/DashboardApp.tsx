import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Switch, Route, useHistory } from 'react-router-dom'
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

const verifyToken = () => axios.get('/api/token')

const DashboardApp: React.FC = () => {
  const history = useHistory()
  const [isVerifyingToken, setIsVerifyingToken] = useState(true)

  useEffect(() => {
    verifyToken()
      .then(() => setIsVerifyingToken(false))
      .catch((error: AxiosError) => {
        if (error && error.response && error.response.status === 401) {
          history.push('/login')
        }
      })
  }, [history])

  if (isVerifyingToken) {
    return <Loading></Loading>
  }

  return (
    <>
      <Topbar />

      <div className="container mx-auto px-2 py-6">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/features/new" component={NewFeaturePage}></Route>
          <Route exact path="/features/:id" component={FeaturePage}></Route>
          <Route exact path="/surveys/new" component={NewSurveyPage}></Route>
          <Route exact path="/surveys/:id" component={SurveyPage}></Route>
          <Route exact path="/forms" component={FormsPage}></Route>
          <Route exact path="/forms/new" component={NewFormPage}></Route>
          <Route exact path="/forms/:id" component={FormPage}></Route>
          <Route
            exact
            path="/integrations"
            component={IntegrationsPage}
          ></Route>
        </Switch>
      </div>
    </>
  )
}

export default DashboardApp
