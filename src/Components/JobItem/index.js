import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="name-rating-box">
            <h1 className="job-role">{title}</h1>
            <div className="rating-box">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-box">
          <div className="location-jobtype-container">
            <MdLocationOn className="icon" />
            <p className="location">{location}</p>
            <BsBriefcaseFill className="icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
