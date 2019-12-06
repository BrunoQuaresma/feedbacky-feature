import React from 'react'
import ReactGA from 'react-ga'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import DashboardApp from './DashboardApp'
import RegisterPage from './RegisterPage'
import './app.css'

if (process.env.REACT_APP_GA_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_ID)
}

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route path="/" component={DashboardApp}></Route>
      </Switch>
    </Router>
  )
}

export default App
