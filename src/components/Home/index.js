import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  openJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container-home">
          <div className="home-container">
            <div>
              <h1>Find The Job That Fits Your Life</h1>
              <p>
                Millions of people are searching for jobs, salary information,
                company reviews. Find the job that
                <br />
                fits your abilities and potential.
              </p>
              <Link to="/jobs">
                <button type="button">Find Jobs</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
