import React from "react";
import Table from "react-bootstrap/Table";

const DisplayUsers = ({ 
  users, 
  loading, 
  error, 
  handleCheckbox, 
  selectedUsers, 
  handleAllDeleteCheckedItems,
  handleDelete,
  handleSelectAll,
  selectAll
}) => {
  if (loading) return <strong>Loading.....</strong>;
  if (error) return <strong>Error: {error}</strong>;

  return (
    <div>
    <button 
        onClick={handleSelectAll} 
        disabled={users?.length === 0}
      >
        {selectAll ? "Deselect All" : "Select All"}
      </button>
      <button onClick={handleAllDeleteCheckedItems} disabled={selectedUsers.length===0}>Delete All Checked Items</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Check</th>
            <th>S.No.</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 ? (
            <tr>
              <td colSpan="6">
                <strong>No Users available</strong>
              </td>
            </tr>
          ) : (
            users?.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckbox(user.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                <button 
                  onClick={() => handleDelete(user.id)}
                  disabled={!selectedUsers.includes(user.id)}
                >
                  Delete
                </button> {/* Add Delete button */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayUsers;
