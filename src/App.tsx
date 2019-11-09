import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import FeaturesPage from './FeaturesPage'
import NewFeaturesPage from './NewFeaturePage'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FeaturesPage}></Route>
        <Route exact path="/features/new" component={NewFeaturesPage}></Route>
      </Switch>
    </Router>
  )
}

export default App
