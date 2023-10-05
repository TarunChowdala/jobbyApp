import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {eachJob} = props

  return (
    <li className="similar-job-item">
      <div className="header">
        <img
          src={eachJob.companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="name-rating-box">
          <h1 className="similar-job-role">{eachJob.title}</h1>
          <div className="rating-box">
            <AiFillStar className="star" />
            <p className="rating">{eachJob.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description">{eachJob.jobDescription}</p>
      <div className="middle-box">
        <div className="location-jobtype-container">
          <MdLocationOn className="icon" />
          <p className="location">{eachJob.location}</p>
          <BsBriefcaseFill className="icon" />
          <p className="employment-type">{eachJob.employmentType}</p>
        </div>
        <p className="salary">{eachJob.packagePerAnnum}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
