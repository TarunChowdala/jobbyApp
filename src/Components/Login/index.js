import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onSubmitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      this.setState({showErrorMsg: false})
      this.submitSuccess(fetchedData.jwt_token)
    } else {
      this.fetchingError(fetchedData)
    }
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  fetchingError = fetchedData => {
    this.setState({showErrorMsg: true, errorMsg: fetchedData.error_msg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <label htmlFor="name-input" className="label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="name-input"
              className="input"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password-input" className="label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password-input"
              className="input"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
