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

const Filters = props => {
  const {updateFilter, updateFilterSalary} = props

  const callFunction = event => {
    updateFilter(event)
  }

  const callFunctionSalary = event => {
    updateFilterSalary(event)
  }

  return (
    <div className="filter-container">
      <h1>Type of Employment</h1>
      {employmentTypesList.map(each => (
        <ul key={each.employmentTypeId}>
          <input
            type="checkbox"
            id={each.employmentTypeId}
            onChange={callFunction}
          />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
        </ul>
      ))}
      <hr />
      <h1>Salary Range</h1>
      {salaryRangesList.map(each => (
        <ul key={each.salaryRangeId}>
          <input
            type="radio"
            id={each.salaryRangeId}
            value={each.salaryRangeId}
            name="salary"
            onChange={callFunctionSalary}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </ul>
      ))}
    </div>
  )
}
export default Filters
