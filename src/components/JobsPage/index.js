import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Filters from '../Filters'
import JobData from '../JobData'

import './index.css'

const status = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  fetched: 'FETCHED',
  notFetched: 'NOTFETCHED',
  searchNotFound: 'SEARCHNOTFOUND',
}

class JobsPage extends Component {
  state = {
    profileStatus: status.initial,
    jobDataQueryList: {
      employmentType: [],
      minimumPackage: '',
      search: '',
    },
    profileDetails: {},
    jobData: [],
    dataStatus: status.inProgress,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobList()
    window.scrollTo(0, 0)
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: status.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileStatus: status.fetched,
      })
    } else {
      this.setState({profileStatus: status.notFetched})
    }
  }

  getJobList = async () => {
    this.setState({dataStatus: status.inProgress})
    const {jobDataQueryList} = this.state
    const {employmentType, minimumPackage, search} = jobDataQueryList
    const emptype = employmentType.join()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${
      emptype || ''
    }&minimum_package=${minimumPackage || ''}&search=${search || ''}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updated = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (updated.length === 0) {
        this.setState({jobData: updated, dataStatus: status.searchNotFound})
      } else {
        this.setState({jobData: updated, dataStatus: status.fetched})
      }
    } else {
      this.setState({dataStatus: status.notFetched})
    }
  }

  renderProfile = () => {
    const {profileDetails, profileStatus} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    if (profileStatus === status.fetched) {
      return (
        <div className="Profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      )
    }
    return (
      <div className="retry-btn-container">
        <button type="button" onClick={this.getProfileDetails} className="btn">
          Retry
        </button>
      </div>
    )
  }

  updateFilter = props => {
    const {checked, id} = props.target
    if (checked) {
      this.setState(
        prev => ({
          ...prev,
          jobDataQueryList: {
            ...prev.jobDataQueryList,
            employmentType: [...prev.jobDataQueryList.employmentType, id],
          },
        }),
        this.getJobList,
      )
    } else {
      const {jobDataQueryList} = this.state
      const {employmentType} = jobDataQueryList
      const filterArray = employmentType.filter(each => each !== id)
      this.setState(
        prev => ({
          ...prev,
          jobDataQueryList: {
            ...prev.jobDataQueryList,
            employmentType: filterArray,
          },
        }),
        this.getJobList,
      )
    }
  }

  updateFilterSalary = props => {
    const {value} = props.target
    this.setState(
      prev => ({
        ...prev,
        jobDataQueryList: {...prev.jobDataQueryList, minimumPackage: value},
      }),
      this.getJobList,
    )
  }

  searchChange = async event => {
    await this.setState(prev => ({
      ...prev,
      jobDataQueryList: {
        ...prev.jobDataQueryList,
        search: event.target.value,
      },
    }))
  }

  onSearch = () => {
    this.getJobList()
  }

  onEnteredSearch = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  render() {
    const {profileStatus, jobData, dataStatus, jobDataQueryList} = this.state
    const {search} = jobDataQueryList

    return (
      <>
        <Header />
        <div className="bg-container-jobs">
          <div className="job-container">
            <div className="filters-container">
              <div className="search-input-container-sm">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.searchChange}
                  value={search}
                  onKeyDown={this.onEnteredSearch}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {profileStatus !== status.inProgress ? (
                this.renderProfile()
              ) : (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              )}
              <hr />
              <Filters
                updateFilter={this.updateFilter}
                updateFilterSalary={this.updateFilterSalary}
              />
            </div>
            <div className="jobs-container">
              <div className="search-input-container-sm display-none-sm">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.searchChange}
                  value={search}
                  onKeyDown={this.onEnteredSearch}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>

              <JobData
                jobData={jobData}
                dataStatus={dataStatus}
                getJobList={this.getJobList}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default JobsPage
