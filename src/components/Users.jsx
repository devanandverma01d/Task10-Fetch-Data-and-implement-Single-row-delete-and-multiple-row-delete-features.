import React, { useState } from "react";
import DisplayUsers from "./DisplayUsers";
import useFetch from "./useFetch";

const Users = () => {
  const { data, setData, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // Track "Select All" state

  const handleCheckbox = (userId) => {
    setSelectedUsers((prevChecked) =>
      prevChecked.includes(userId) 
        ? prevChecked.filter((id) => id !== userId)  // Remove if already selected
        : [...prevChecked, userId] // Add if not selected
    );
  };

  const handleAllDeleteCheckedItems = () => {
    const remainingUsers = data.filter((user) => !selectedUsers.includes(user.id));
    setData(remainingUsers); // Update the fetched data directly
    setSelectedUsers([]); // Clear selected users
  };

    // Handle single user deletion
    const handleDelete = (userId) => {
      const remainingUsers = data.filter((user) => user.id !== userId);
      setData(remainingUsers);
    };

    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedUsers([]); // Deselect all
      } else {
        setSelectedUsers(data.map((user) => user.id)); // Select all user IDs
      }
      setSelectAll(!selectAll); // Toggle the selectAll state
    };

  return (
    <div>
      <DisplayUsers
        handleCheckbox={handleCheckbox}
        selectedUsers={selectedUsers}
        handleAllDeleteCheckedItems={handleAllDeleteCheckedItems}
        users={data}
        loading={loading}
        error={error}
        handleDelete={handleDelete}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
      />
    </div>
  );
};

export default Users;
