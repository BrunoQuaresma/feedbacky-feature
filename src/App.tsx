import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import NewFeaturePage from './NewFeaturePage'
import NewSurveyPage from './NewSurveyPage'
import LoginPage from './LoginPage'
import IntegrationsPage from './IntegrationsPage'
import SurveyPage from './SurveyPage'
import FeaturePage from './FeaturePage'

const App: React.FC = () => {
  return (
    <Router>
      <header className="bg-indigo-500 text-indigo-200 shadow-md">
        <div className="container mx-auto px-2 py-3 flex items-baseline sm:py-0">
          <span className="font-medium text-xl text-white">feedbacky</span>
          <nav className="hidden sm:block ml-4">
            <Link className="inline-block px-2 py-4 text-white" to="/">
              Dashboard
            </Link>
            <Link className="inline-block px-2 py-4" to="/integrations">
              Integrations
            </Link>
          </nav>

          <nav className="hidden sm:block ml-auto">
            <button>Sair</button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-2 py-6">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/features/new" component={NewFeaturePage}></Route>
          <Route exact path="/features/:id" component={FeaturePage}></Route>
          <Route exact path="/surveys/new" component={NewSurveyPage}></Route>
          <Route exact path="/surveys/:id" component={SurveyPage}></Route>
          <Route
            exact
            path="/integrations"
            component={IntegrationsPage}
          ></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
