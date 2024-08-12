import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../types";
import SearchBar from "./SearchBar";
import UserListTable from "./UserListTable";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearchQueryChange = (value: string): void => {
    setSearchQuery(value);
  };

  const getFilteredUserList = (): User[] => {
    const filteredUserList: User[] = [];
    users.forEach((user) => {
      if (user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        filteredUserList.push(user);
      }
    });
    return filteredUserList;
  };

  return (
    <Box>
      {loading && <Box>Still loading...</Box>}
      {error && <Box>Error: ${error.message}</Box>}
      {!loading && !error && (
        <Box>
          <SearchBar
            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
          />
          <UserListTable users={getFilteredUserList()} />
        </Box>
      )}
    </Box>
  );
};

export default UserList;
