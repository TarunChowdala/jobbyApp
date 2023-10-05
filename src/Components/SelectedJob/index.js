import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

class SelectedJob extends Component {
  state = {selectedJobData: [], apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getSelectedJobData()
  }

  getSelectedJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedData = {
        jobDetails: {
          companyLogoUrl: fetchedData.job_details.company_logo_url,
          companyWebsiteUrl: fetchedData.job_details.company_website_url,
          employmentType: fetchedData.job_details.employment_type,
          id: fetchedData.job_details.id,
          jobDescription: fetchedData.job_details.job_description,
          lifeAtCompany: {
            description: fetchedData.job_details.life_at_company.description,
            imageUrl: fetchedData.job_details.life_at_company.image_url,
          },
          location: fetchedData.job_details.location,
          packagePerAnnum: fetchedData.job_details.package_per_annum,
          rating: fetchedData.job_details.rating,
          skills: fetchedData.job_details.skills.map(eachItem => ({
            name: eachItem.name,
            imageUrl: eachItem.image_url,
          })),
          title: fetchedData.job_details.title,
        },
        similarJobs: fetchedData.similar_jobs.map(eachObject => ({
          companyLogoUrl: eachObject.company_logo_url,
          employmentType: eachObject.employment_type,
          id: eachObject.id,
          jobDescription: eachObject.job_description,
          location: eachObject.location,
          rating: eachObject.rating,
          title: eachObject.title,
        })),
      }
      this.setState({selectedJobData: formattedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILED'})
    }
  }

  renderFailedData = () => (
    <div className="failed-job-details-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderEachSkill = eachSkill => (
    <li className="skill-item" id={eachSkill.id}>
      <img
        src={eachSkill.imageUrl}
        alt={eachSkill.name}
        className="skill-img"
      />
      <p className="skill-name">{eachSkill.name}</p>
    </li>
  )

  renderJobData = () => {
    const {selectedJobData} = this.state
    return (
      <>
        <div className="job-item">
          <div className="job-header">
            <img
              src={selectedJobData.jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="selected-company-logo"
            />
            <div className="name-rating-box">
              <p className="selected-job-role">
                {selectedJobData.jobDetails.title}
              </p>
              <div className="rating-box">
                <AiFillStar className="star" />
                <p className="job-rating">
                  {selectedJobData.jobDetails.rating}
                </p>
              </div>
            </div>
          </div>
          <div className="middle-box">
            <div className="location-jobtype-container">
              <MdLocationOn className="icon" />
              <p className="location">{selectedJobData.jobDetails.location}</p>
              <BsBriefcaseFill className="icon" />
              <p className="employment-type">
                {selectedJobData.jobDetails.employmentType}
              </p>
            </div>
            <p className="salary">
              {selectedJobData.jobDetails.packagePerAnnum}
            </p>
          </div>
          <hr className="hr" />
          <div className="disc-container">
            <h1 className="job-description-heading">Description</h1>
            <div className="visit">
              <a
                href={selectedJobData.jobDetails.companyWebsiteUrl}
                target="__blank"
                className="anchor"
              >
                Visit
              </a>
              <FaShareSquare className="visit-icon" />
            </div>
          </div>

          <p className="job-description">
            {selectedJobData.jobDetails.jobDescription}
          </p>
          <h1 className="skills-text">Skills</h1>
          <ul className="skills-container">
            {selectedJobData.jobDetails.skills.map(eachSkill =>
              this.renderEachSkill(eachSkill),
            )}
          </ul>
          <h1 className="life-at-company">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="lac-description">
              {selectedJobData.jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={selectedJobData.jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
              className="job-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-job-item-container">
          {selectedJobData.similarJobs.map(eachJob => (
            <SimilarJobItem key={eachJob.id} eachJob={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderJobLoader = () => (
    <div className="loader-box" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    let renderedData
    switch (apiStatus) {
      case 'SUCCESS':
        renderedData = this.renderJobData()
        break
      case 'FAILED':
        renderedData = this.renderFailedData()
        break
      default:
        renderedData = this.renderJobLoader()
    }
    return (
      <div className="selected-job-container">
        <Header />
        <div className="job-inner-container">{renderedData}</div>
      </div>
    )
  }
}

export default SelectedJob
