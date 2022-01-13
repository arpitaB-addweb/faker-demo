import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function Search({ placeholder, data }) {
  const [filter, setFilter] = useState([]);
  const [enterData, setEnterdata] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setEnterdata(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "" || searchWord === " ") {
      setFilter([]);
    } else {
      setFilter(newFilter);
    }
  };

  const clearInput = () => {
    setFilter([]);
    setEnterdata("");
  };

  return (
    <div className="search">
      <div className="Input">
        <input
          type="text"
          placeholder={placeholder}
          value={enterData}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filter.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filter.length !== 0 && (
        <div className="dataResult">
          {filter.slice(0, 15).map((value) => {
            return (
              <a className="dataItem" href={value.link}>
                <p>{value.title} <br />
                {value.link}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;