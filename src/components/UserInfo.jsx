import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

function List({ title, items }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function UserInfo({ user, show, handleClose }) {
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cachedData, setCachedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: postsData } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const { data: todosData } = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?userId=${user.id}`
        );
        const newPosts = postsData.map((item) => item.title);
        const newTodos = todosData.map((item) => item.title);
        setPosts(newPosts);
        setTodos(newTodos);

        setCachedData((prev) => ({
          [user.id]: { posts: newPosts, todos: newTodos },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    const changeData = async function () {
      setLoading(true);
      if (show && user) {
        if (cachedData[user.id]) {
          setPosts(cachedData[user.id].posts);
          setTodos(cachedData[user.id].todos);
        } else {
          await fetchData();
        }
      }
      setLoading(false);
    };
    changeData();
  }, [user, show]);

  return (
    <>
      <Modal onHide={handleClose} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>{user ? user.name : "Loading..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ display: "flex" }}>
              <List title="POSTS" items={posts} />
              <List title="TODOS" items={todos} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
