import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', isLoginFailed: false, errorMsg: ''}

  componentDidMount() {
    if (Cookies.get('jwt_token') !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  onChangeUsername = event => {
    const {value} = event.target
    if (event.target.id === 'username') {
      this.setState({username: value})
    } else {
      this.setState({password: value})
    }
  }

  successSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, option)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      this.successSubmit(jwtToken)
    } else {
      this.setState({isLoginFailed: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, isLoginFailed, errorMsg} = this.state
    return (
      <div className="bg-container">
        <form className="login-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
              required
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.onChangeUsername}
              value={password}
              required
            />
          </div>
          <button type="submit">Login</button>
          {isLoginFailed === true && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginPage
