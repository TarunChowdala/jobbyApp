import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="description-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary, information, company
        reviews. Find the jobs that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-jobs-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
