import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN PROGRESS',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getGitRepos()
  }

  clickLanguageItem = tabValue => {
    this.setState({activeLanguageId: tabValue}, this.getGitRepos)
  }

  getGitRepos = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          className="failure-img"
          alt="failure view"
        />
        <h1 className="failure-heading">Something Went Wrong</h1>
      </div>
    )
  }

  renderPopularReposView = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-container">
        {reposList.map(each => (
          <RepositoryItem reposList={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeLanguageId, apiStatus} = this.state
    return (
      <div className="github-app-container">
        <h1 className="app-heading">Popular</h1>
        <div className="language-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageFiltersData={each}
              key={each.id}
              clickLanguageItem={this.clickLanguageItem}
              isActive={activeLanguageId === each.id}
            />
          ))}
        </div>
        {apiStatus === apiStatusConstants.in_progress ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.renderPopularReposView()
        )}
        {apiStatus === apiStatusConstants.failure
          ? this.renderFailureView()
          : ''}
      </div>
    )
  }
}

export default GithubPopularRepos
