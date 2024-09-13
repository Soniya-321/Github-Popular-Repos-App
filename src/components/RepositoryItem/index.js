// Write your code here
import './index.css'
const RepositoryItem = props => {
  const {reposList} = props
  const {name, avatarUrl, forksCount, starsCount, issuesCount} = reposList

  return (
    <li className="repo-list-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repo-heading">{name}</h1>
      <div className="options">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="options">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="options">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
