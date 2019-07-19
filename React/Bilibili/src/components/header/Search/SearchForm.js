import React from "react"
import "./SearchForm.css"

class SearchForm extends React.Component {
  render() {
    return (
      <div className="SearchForm">
        <input type="text"/>
        <i className="search-icon"></i>
      </div>
    )
  }
}
export default SearchForm;
