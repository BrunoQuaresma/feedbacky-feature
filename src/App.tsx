import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import NewFeaturePage from './NewFeaturePage'
import NewSurveyPage from './NewSurveyPage'
import LoginPage from './LoginPage'
import IntegrationsPage from './IntegrationsPage'
import SurveyPage from './SurveyPage'

const App: React.FC = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/integrations">Integrations</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/features/new" component={NewFeaturePage}></Route>
        <Route exact path="/surveys/new" component={NewSurveyPage}></Route>
        <Route exact path="/surveys/:id" component={SurveyPage}></Route>
        <Route exact path="/integrations" component={IntegrationsPage}></Route>
      </Switch>
    </Router>
  )
}

export default App
