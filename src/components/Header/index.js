import {MdHome} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="nav-items-sm-container">
        <li>
          <Link to="/" className="link">
            <MdHome />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            <FaBriefcase />
          </Link>
        </li>
        <li>
          <button className="sm-btn-nav" onClick={logoutUser} type="button">
            <FiLogOut />
          </button>
        </li>
      </ul>
      <div className="nav-items-lg-container">
        <ul className="nav-list-lg">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
