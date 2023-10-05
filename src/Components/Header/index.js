import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiOutlineLogout} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-for-large">
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>

        <ul className="mini-box">
          <Link to="/" className="link-item">
            <li className="home-text list-item">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="jobs-text list-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="header-for-small">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
        <ul className="logos-box">
          <Link to="/" className="link-item">
            <li className="list-item">
              <AiFillHome className="icons" />
            </li>
          </Link>

          <Link to="/jobs" className="link-item">
            <li className="list-item">
              <BsBriefcaseFill className="icons" />
            </li>
          </Link>

          <li className="list-item">
            <HiOutlineLogout className="icons" onClick={onClickLogout} />
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
