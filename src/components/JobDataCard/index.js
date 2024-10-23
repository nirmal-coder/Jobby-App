import {FaStar, FaBriefcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import './index.css'

const JobDataCard = props => {
  const {obj, altText} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = obj

  return (
    <Link to={`/jobs/${id}`} className="link">
      <div className="card-container">
        <div className="logo-title-container">
          <img src={companyLogoUrl} alt={altText} className="logo" />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div>
            <div>
              <IoLocationSharp className="icon-location" />
              <p>{location}</p>
            </div>
            <div>
              <FaBriefcase className="icon-location" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="Description-container">
          <h2>Description</h2>
          <p className="jobDescription">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobDataCard
