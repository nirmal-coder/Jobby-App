import {Component} from 'react'
import Loader from 'react-loader-spinner'
import JobDataCard from '../JobDataCard'
import './index.css'

const status = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  fetched: 'FETCHED',
  notFetched: 'NOTFETCHED',
  searchNotFound: 'SEARCHNOTFOUND',
}

class JobData extends Component {
  callFunction = () => {
    const {getJobList} = this.props
    getJobList()
  }

  renderJobs = () => {
    const {jobData} = this.props

    const jobCard = jobData.map(each => (
      <JobDataCard obj={each} key={each.id} altText="company logo" />
    ))
    return jobCard
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-fetch-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="btn" onClick={this.callFunction} type="button">
        Retry
      </button>
    </div>
  )

  noSearchResult = () => (
    <div className="failure-fetch-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  render() {
    const {dataStatus} = this.props
    console.log('render called in jobData')
    switch (dataStatus) {
      case status.fetched:
        return this.renderJobs()
      case status.inProgress:
        return this.renderLoading()
      case status.notFetched:
        return this.renderFailure()
      case status.searchNotFound:
        return this.noSearchResult()
      default:
        return null
    }
  }
}
export default JobData
