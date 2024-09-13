// Write your code here
import './index.css'
const LanguageFilterItem = props => {
  const {languageFiltersData, clickLanguageItem, isActive} = props
  const {id, language} = languageFiltersData

  const onClickLangItem = () => {
    clickLanguageItem(id)
  }

  const activeLangItemClassname = isActive ? 'active-btn' : ''
  return (
    <button
      className={`language-list-container ${activeLangItemClassname}`}
      onClick={onClickLangItem}
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
