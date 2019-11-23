import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import DashboardApp from './DashboardApp'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route path="/" component={DashboardApp}></Route>
      </Switch>
    </Router>
  )
}

export default App
