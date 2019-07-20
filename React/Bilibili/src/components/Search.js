import React from "react"
import SearchForm from "./SearchForm"
import LinkRankingButton from "./LinkRankingButton"
import "./Search.css"

class Search extends React.Component {
  render() {
    return (
      <div className="search flex">
        <LinkRankingButton></LinkRankingButton>
        <SearchForm></SearchForm>
      </div>
    )
  }
}
export default Search;
