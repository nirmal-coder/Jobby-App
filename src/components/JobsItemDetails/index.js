import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaBriefcase, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import JobDataCard from '../JobDataCard'
import Header from '../Header'
import SkillsList from '../SkillsList'
import './index.css'

const status = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  fetched: 'FETCHED',
  notFetched: 'NOTFETCHED',
  searchNotFound: 'SEARCHNOTFOUND',
}

class JobsItemDetails extends Component {
  state = {
    jobDetailsStatus: status.inProgress,
    jobDetailsList: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
    window.scrollTo(0, 0)
  }

  getJobDetails = async () => {
    this.setState({jobDetailsStatus: status.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({jobDetailsStatus: status.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()

        const jobDetails = data.job_details || {}
        const similarJobs = data.similar_jobs || []

        const updatedJobDetails = {
          companyLogoUrl: jobDetails.company_logo_url || '',
          companyWebsiteUrl: jobDetails.company_website_url || '',
          id: jobDetails.id || '',
          jobDescription: jobDetails.job_description || '',
          location: jobDetails.location || '',
          packagePerAnnum: jobDetails.package_per_annum || '',
          rating: jobDetails.rating || '',
          title: jobDetails.title || '',
          lifeAtCompany: jobDetails.life_at_company || {},
          skills: jobDetails.skills || [],
          employmentType: jobDetails.employment_type || '',
        }
        const updatedSimilarJobs = similarJobs.map(each => ({
          companyLogoUrl: each.company_logo_url || '',
          companyWebsiteUrl: each.company_website_url || '',
          id: each.id || '',
          jobDescription: each.job_description || '',
          location: each.location || '',
          packagePerAnnum: each.package_per_annum || '',
          rating: each.rating || '',
          title: each.title || '',
          employmentType: each.employment_type || '',
        }))
        this.setState({
          jobDetailsList: updatedJobDetails,
          similarJobs: updatedSimilarJobs,
          jobDetailsStatus: status.fetched,
        })
      } else {
        this.setState({jobDetailsStatus: status.notFetched})
      }
    } catch (error) {
      console.error('Failed to fetch job details:', error)
      this.setState({jobDetailsStatus: status.notFetched})
    }
  }

  renderDetails = () => {
    const {jobDetailsList, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetailsList

    const lifeInCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    const {description, imageUrl} = lifeInCompany

    const skill = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))

    return (
      <>
        <Header />
        <div className="job-detail-container">
          <div className="container-job-details">
            <div className="logo-title-container-job-details">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="logo-job-details"
              />
              <div>
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-container-job-details">
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
            <div className="Description-container-job-details">
              <div className="Description-header">
                <h2>Description</h2>
                <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                  Visit <FaExternalLinkAlt className="link-icon" />
                </a>
              </div>

              <p className="jobDescription">{jobDescription}</p>
            </div>
            <div className="lifeAtCompany-container">
              <h1>Skills</h1>
              <ul className="skills-container">
                {skill.map(each => (
                  <SkillsList obj={each} key={each.name} />
                ))}
              </ul>
              <h1>Life at Company</h1>
              <div className="lifeAtCompany-des">
                <p className="jobDescription lg-description">{description}</p>
                <img
                  src={imageUrl}
                  alt="life at company"
                  className="life-at-company-img lg-description"
                />
              </div>
            </div>
          </div>
          <h1 className="similar-heading">Similar Jobs</h1>
          <div className="container-job-details-similar">
            {similarJobs.map(each => (
              <JobDataCard
                obj={each}
                key={each.id}
                altText="similar job company logo"
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader" id="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderFailure = () => (
    <>
      <Header />
      <div className="failure-fetch-container bg-color">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" onClick={this.getJobDetails} className="btn">
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {jobDetailsStatus} = this.state

    switch (jobDetailsStatus) {
      case status.inProgress:
        return this.renderLoader()
      case status.fetched:
        return this.renderDetails()
      case status.notFetched:
        return this.renderFailure()
      default:
        return this.renderLoader()
    }
  }
}
export default JobsItemDetails
