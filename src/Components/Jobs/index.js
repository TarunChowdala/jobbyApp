import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Jobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    profileApiStatus: apiStatusConst.initial,
    dataApiStatus: apiStatusConst.initial,
    employmentTypeList: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.jobsData()
  }

  // getting profile data form server

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: profileDetails,
        profileApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConst.failed})
    }
  }

  // jsx when profile fetching success

  renderProfileDetails = profileData => (
    <div className="profile-container">
      <img
        src={profileData.profileImageUrl}
        alt="profile"
        className="profile-img"
      />
      <h1 className="profile-name">{profileData.name}</h1>
      <p className="profile-para">{profileData.shortBio}</p>
    </div>
  )

  // onclick function when retry button clicked

  onClickRetry = () => {
    this.setState({profileApiStatus: apiStatusConst.initial})
    this.getProfileData()
  }

  // jsx when profile fetching failed

  renderFailedProfileDetails = () => (
    <div className="failed-profile-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  // loader jsx

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobLoader = () => (
    <div className="loader-box" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  // getting jobsData from server
  jobsData = async () => {
    const {salaryRange, employmentTypeList, searchInput} = this.state
    const employment = employmentTypeList.join(',')

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salaryRange}&search=${searchInput}`

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedData = fetchedData.jobs.map(eachItem =>
        this.formattedObject(eachItem),
      )
      this.setState({
        jobsData: formattedData,
        dataApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({dataApiStatus: apiStatusConst.failed})
    }
  }

  formattedObject = eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    location: eachItem.location,
    packagePerAnnum: eachItem.package_per_annum,
    rating: eachItem.rating,
    title: eachItem.title,
  })

  renderJobDetails = jobsData => {
    if (jobsData.length === 0) {
      return (
        <div className="failed-job-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-img"
          />
          <h1 className="failure-heading">No Jobs Found</h1>
          <p className="failure-para">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="job-list">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  onClickJobsRetry = () => {
    this.setState({dataApiStatus: apiStatusConst.initial})
    this.jobsData()
  }

  failedJobDetails = () => (
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

  // onchange function when select the employment type

  onClickEmployment = event => {
    const {employmentTypeList} = this.state
    if (employmentTypeList.includes(event.target.value) === false) {
      this.setState({dataApiStatus: apiStatusConst.initial})
      this.setState(
        prevState => ({
          employmentTypeList: [
            ...prevState.employmentTypeList,
            event.target.value,
          ],
        }),
        this.jobsData,
      )
    } else {
      const newList = employmentTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      this.setState(
        {employmentTypeList: newList, dataApiStatus: apiStatusConst.initial},
        this.jobsData,
      )
    }
  }

  onClickSalary = event => {
    this.setState(
      {
        salaryRange: event.target.value,
        dataApiStatus: apiStatusConst.initial,
      },
      this.jobsData,
    )
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState(
        {
          searchInput: event.target.value,
          dataApiStatus: apiStatusConst.initial,
        },
        this.jobsData,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.setState(
        {
          searchInput,
          dataApiStatus: apiStatusConst.initial,
        },
        this.jobsData,
      )
    }
  }

  render() {
    const {profileData, profileApiStatus, jobsData, dataApiStatus} = this.state
    let profileDataDetails
    switch (profileApiStatus) {
      case apiStatusConst.success:
        profileDataDetails = this.renderProfileDetails(profileData)
        break
      case apiStatusConst.failed:
        profileDataDetails = this.renderFailedProfileDetails()
        break
      default:
        profileDataDetails = this.renderLoader()
    }

    let jobsDataDetails
    switch (dataApiStatus) {
      case apiStatusConst.success:
        jobsDataDetails = this.renderJobDetails(jobsData)
        break
      case apiStatusConst.failed:
        jobsDataDetails = this.failedJobDetails()
        break
      default:
        jobsDataDetails = this.renderJobLoader()
    }

    return (
      <div className="product-container">
        <Header />
        <div className="inside-container">
          <div className="filters-container">
            {profileDataDetails}
            <hr className="hr-line" />
            <h1 className="filter-heading">Type of Employment</h1>
            <ul className="employment-filter-container ul-list">
              <li className="checkbox-container list-item">
                <input
                  id="fullTime"
                  type="checkbox"
                  value={employmentTypesList[0].employmentTypeId}
                  onClick={this.onClickEmployment}
                />
                <label className="label" htmlFor="fullTime">
                  {employmentTypesList[0].label}
                </label>
              </li>

              <li className="checkbox-container list-item">
                <input
                  id="partTime"
                  type="checkbox"
                  value={employmentTypesList[1].employmentTypeId}
                  onClick={this.onClickEmployment}
                />
                <label className="label" htmlFor="partTime">
                  {employmentTypesList[1].label}
                </label>
              </li>
              <li className="checkbox-container list-item">
                <input
                  id="freelance"
                  type="checkbox"
                  value={employmentTypesList[2].employmentTypeId}
                  onClick={this.onClickEmployment}
                />
                <label className="label" htmlFor="freelance">
                  {employmentTypesList[2].label}
                </label>
              </li>
              <li className="checkbox-container list-item">
                <input
                  id="internship"
                  type="checkbox"
                  value={employmentTypesList[3].employmentTypeId}
                  onClick={this.onClickEmployment}
                />
                <label className="label" htmlFor="internship">
                  {employmentTypesList[3].label}
                </label>
              </li>
            </ul>
            <hr className="hr-line" />
            <h1 className="filter-heading ">Salary Range</h1>
            <ul className="employment-filter-container ul-list">
              <li className="checkbox-container list-item">
                <input
                  id="10lpa"
                  type="radio"
                  value={salaryRangesList[0].salaryRangeId}
                  onClick={this.onClickSalary}
                  name="salary"
                />
                <label className="label" htmlFor="10lpa">
                  {salaryRangesList[0].label}
                </label>
              </li>

              <li className="checkbox-container list-item">
                <input
                  id="20lpa"
                  type="radio"
                  value={salaryRangesList[1].salaryRangeId}
                  onClick={this.onClickSalary}
                  name="salary"
                />
                <label className="label" htmlFor="20lpa">
                  {salaryRangesList[1].label}
                </label>
              </li>
              <li className="checkbox-container list-item">
                <input
                  id="30lpa"
                  type="radio"
                  value={salaryRangesList[2].salaryRangeId}
                  onClick={this.onClickSalary}
                  name="salary"
                />
                <label className="label" htmlFor="30lpa">
                  {salaryRangesList[2].label}
                </label>
              </li>
              <li className="checkbox-container list-item">
                <input
                  id="40lpa"
                  type="radio"
                  value={salaryRangesList[3].salaryRangeId}
                  onClick={this.onClickSalary}
                  name="salary"
                />
                <label className="label" htmlFor="40lpa">
                  {salaryRangesList[3].label}
                </label>
              </li>
            </ul>
          </div>
          <div className="jobs-container">
            <div className="searchInput-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onKeyDown={this.onKeyDownSearchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="icon-container"
                onClick={this.onClickSearch}
              >
                <BsSearch className="icon" />
              </button>
            </div>
            {jobsDataDetails}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
