import React from "react";
import { User } from "../types";

interface UserListTableProps {
  users: Array<User>;
}

const UserListTable: React.FC<UserListTableProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id}>
            {user.name} - {user.email} - {user.company.name}
          </li>
        );
      })}
    </ul>
  );
};

export default UserListTable;
