import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Header from "./Header";
import Main from "./Main";
import SearchForm from "./SearchForm";
import MemberList from "./MemberList";
import Footer from "./Footer";
import API from "../utils/API";
import MembersContext from "../utils/MembersContext";
import ResultsContext from "../utils/ResultsContext";
import SearchContext from "../utils/SearchContext";
import "./style.css";

function EmployeeContainer() {
  const [members, setMembers] = useState({ members: [] });
  const [results, setResults] = useState({ results: [] });
  const [search, setSearch] = useState({ search: "", filter: "" });

  // When the component mounts, get a list of random employees and update state
  useEffect(() => {
    API.getRandomEmployees()
      .then((res) => {
        setMembers({ members: res.data.results });
        setResults({ results: res.data.results });
        console.log(res.data.results)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const searchList = members.members
      .filter((item) =>
        search.filter === ""
          ? true
          : item.gender.toLowerCase().trim() ===
            search.filter.toLowerCase().trim()
      )
      .filter((item) =>
        search.search === ""
          ? true
          : item.name.first.toLowerCase().includes(search.search.toLowerCase())
      );
    setResults({ results: searchList });
  }, [members.members, search]);

  const handleSearchChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setSearch({ ...search, [name]: value });
    setResults({ results: members.members });
  };

  return (
    <Wrapper>
      <Header />
      <MembersContext.Provider value={members}>
        <ResultsContext.Provider value={results}>
          <SearchContext.Provider value={search}>
            <Main>
              <SearchForm handleSearchChange={handleSearchChange} />
              <MemberList />
            </Main>
          </SearchContext.Provider>
        </ResultsContext.Provider>
      </MembersContext.Provider>
      <Footer />
    </Wrapper>
  );
}

export default EmployeeContainer;
