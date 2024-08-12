import React, { useState } from "react";
import debounce from "../CommonUtilities";

interface SearchBarProps {
  handleSearchQueryChange: (value: string) => void;
  searchQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchQueryChange,
}) => {
  const [query, setQuery] = useState<string>(searchQuery || "");

  const debouncedHandleSearchQueryChange = debounce(
    handleSearchQueryChange,
    500
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearchQuery = event.target.value || "";
    setQuery(updatedSearchQuery);
    debouncedHandleSearchQueryChange(updatedSearchQuery);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <label>Search:</label>
      <input
        id="search-box"
        type="search"
        placeholder="Eg: John"
        value={query}
        onChange={handleQueryChange}
      ></input>
    </div>
  );
};

export default SearchBar;
