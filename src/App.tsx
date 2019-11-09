import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import NewFeaturePage from './NewFeaturePage'
import NewSurveyPage from './NewSurveyPage'
import LoginPage from './LoginPage'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/features/new" component={NewFeaturePage}></Route>
        <Route exact path="/surveys/new" component={NewSurveyPage}></Route>
      </Switch>
    </Router>
  )
}

export default App
