import React, { useState } from "react";
import DisplayUsers from "./DisplayUsers";
import useFetch from "./useFetch";

const Users = () => {
  const { data, setData, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
  const [selectedUsers, setSelectedUsers] = useState([]);

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
      />
    </div>
  );
};

export default Users;
