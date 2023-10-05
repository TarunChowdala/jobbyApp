import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import Jobs from './Components/Jobs'
import SelectedJob from './Components/SelectedJob'
import ProtectedRoute from './Components/ProtectedRoute'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={SelectedJob} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
