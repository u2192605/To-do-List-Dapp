import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const Search = () => {
  const [searchTextChange, setSearchText] = useState("");

  const handleOnSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <div >
      <input
        type="search"
        value={searchTextChange}
        onChange={handleOnSearchTextChange}
      />
      <div >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
};
