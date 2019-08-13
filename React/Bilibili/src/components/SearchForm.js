import React from "react"
import "./SearchForm.css"

class SearchForm extends React.Component {
  render() {
    return (
      <div className="searchForm flex">
        <input placeholder="BML直播" type="text"/>
        <button className="search-icon" type="submit"></button>
      </div>
    )
  }
}
export default SearchForm;
