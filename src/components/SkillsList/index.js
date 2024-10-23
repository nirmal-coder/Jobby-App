import './index.css'

const SkillsList = props => {
  const {obj} = props
  const {imageUrl, name} = obj
  return (
    <li className="list-container">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default SkillsList
