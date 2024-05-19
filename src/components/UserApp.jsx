import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "./UserInfo.jsx";

export default function UserApp() {
  const [users, setUsers] = useState([]);
  const [onModal, setOnModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const getUsersData = async function () {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div style={{ width: "50%", height: "100%", margin: "10px" }}>
      <h2>USER</h2>
      <ListGroup>
        {users.map((user) => (
          <div key={user.id}>
            <ListGroup.Item
              style={{ padding: "3px" }}
              onClick={() => {
                setOnModal((prev) => !prev);
                console.log(!onModal);
                setModalUser((prev) => user);
              }}
            >
              {user.id}. {user.name} - {user.email}
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
      {modalUser ? (
        <UserInfo
          user={modalUser}
          show={onModal}
          handleClose={() => {
            setOnModal((prev) => false);
          }}
        ></UserInfo>
      ) : null}
    </div>
  );
}
