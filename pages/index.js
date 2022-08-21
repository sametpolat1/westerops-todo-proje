import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { Icon } from "@iconify/react";
import "bootstrap/dist/css/bootstrap.css";

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoEdit, setTodoEdit] = useState({ isInput: false, id: "" });
  const [todoEdittext, setEdittingtext] = useState("");

  // For add the input to database.json(api).
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput === "") {
      alert("Task list not be blank!");
    } else {
      handlePost(userInput);
      setTodoList([...todoList, userInput]);
      setUserInput("");
    }
  };
  //For add to to-do
  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/todos")
      .then((response) => setTodoList(response.data))
      .catch((error) => console.log(error));
  }, [todoEdit]);

  const handleFetch = () => {
    axios
      .get("http://localhost:3000/api/todos")
      .then((response) => setTodoList(response.data))
      .catch((error) => console.log(error));
  };
  // For add data into database.json with axios.
  const handlePost = async (todoName) => {
    try {
      const resp = await axios.post(`http://localhost:3000/api/todos`, {
        title: todoName,
      });
      console.log(todoName);
      handleFetch();
    } catch (err) {
      console.error(err);
    }
  };

  // For todo Update
  const todoUpdate = async (id, todoName) => {
    setEdittingtext(todoName);
    setTodoEdit({ isInput: true, id: id });
    try {
      const resp = await axios.patch(`http://localhost:3000/api/todos/${id}`, {
        title: todoName,
      });
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  //Function for the Save button inside the Update button.
  const todoSend = async (id) => {
    try {
      const resp = await axios.patch(
        `http://localhost:3000/api/todos/${id}`,

        {
          title: todoEdittext,
        }
      );
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
    setTodoEdit({ isInput: false, id: "" });
  };
  //For the save input value in update.
  const handleChangeValue = (e) => {
    setEdittingtext(e.target.value);
  };

  // For todo delete.
  const handleDelete = async (todo) => {
    await axios.delete(`http://localhost:3000/api/todos/${todo.id}`);
    const updateArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
    );
    setTodoList(updateArr);
  };
  //For pinned value: false or true
  const handlePinned = async (id, todoName, pinned) => {
    try {
      const resp = await axios.patch(`http://localhost:3000/api/todos/${id}`, {
        title: todoName,
        pinned: !pinned,
      });
      console.log("pinnedworking", resp, todoName, pinned);
      handleFetch();
    } catch (err) {
      console.error(err);
    }
  };
  //For checked value : false or true
  const handleChecked = async (id, todoName, checked) => {
    try {
      const resp = await axios.patch(`http://localhost:3000/api/todos/${id}`, {
        title: todoName,
        checked: !checked,
      });
      console.log("checkedworking", resp, todoName, checked);
      handleFetch();
    } catch (err) {
      console.error(err);
    }
  };

  // For LocalStorage
  useEffect(() => {
    const localStorageValue = todoList;
    localStorage.setItem("todoList", JSON.stringify(localStorageValue));
  }, [todoList]);

  return (
    <div>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1 className={styles.title + " my-4 "}>
          <span className={styles.i}>/</span>
          <span className={styles.i2}>/</span>
          <span className={styles.o1}>O</span>
          <span> </span>
          <span className={styles.w1}>W</span>
          <span className={styles.w1}>e</span>
          <span className={styles.w1}>s</span>
          <span className={styles.w1}>t</span>
          <span className={styles.w1}>e</span>
          <span className={styles.w1}>r</span>
          <span className={styles.w1}>O</span>
          <span className={styles.w1}>p</span>
          <span className={styles.w1}>s</span>
        </h1>
        <div className="rounded w-50 bg-white">
          <div>
            <h1 className={styles.alticizili + " py-2"}> To Do List</h1>
            <hr />
          </div>
          <div className="d-flex justify-content-between px-5 py-2">
            <form className="input-group input-group-outline ">
              <input
                className="form-control"
                type="text"
                placeholder="Add a task..."
                value={userInput}
                onChange={(e) => handleChange(e)}
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                <Icon
                  icon="material-symbols:arrow-circle-right-rounded"
                  color="#fff"
                  width="35"
                  height="35"
                />
              </button>
            </form>
          </div>
          <div className="px-5 py-2">
            <h6>Completed List Items</h6>
            <ul>
              {todoList.map((todo, index) => {
                return todo.checked === true ? (
                  <li
                    className="d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <span className="align-self-center d-flex">
                      <Icon
                        icon="material-symbols:check-circle-outline-rounded"
                        color="#21AF79"
                        width="20"
                        height="20"
                      />
                      {todo.title}
                    </span>
                    <div className="btn-group m-1 ">
                      <button
                        className="btn light dropdown rounded rounded"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButton1"
                        aria-expanded="false"
                      >
                        <b> ... </b>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            className="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <Icon
                              icon="material-symbols:check-circle-outline-rounded"
                              color="black"
                            />

                            <button
                              className="btn border-none rounded"
                              onClick={() => {
                                handleChecked(
                                  todo.id,
                                  todo.title,
                                  todo.checked
                                );
                              }}
                              // className={styles.delete}
                            >
                              Not checked
                            </button>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  ""
                );
              })}
            </ul>
            <hr />
          </div>
          <div className="px-5 py-2">
            <h6>Pin to Todo</h6>
            <ul>
              {todoList.map((todo, index) => {
                return todo.pinned === true ? (
                  <li
                    className="d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <span className="align-self-center d-flex">
                      <Icon
                        icon="material-symbols:push-pin-outline"
                        color="#F53A86"
                        width="22"
                        height="22"
                      />
                      {todo.title}
                    </span>
                    <div className="btn-group m-1">
                      <button
                        className="btn light dropdown rounded"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButton1"
                        aria-expanded="false"
                      >
                        <b> ... </b>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            className="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <Icon
                              icon="material-symbols:push-pin-outline"
                              color="black"
                            />
                            <button
                              className="btn border-none"
                              onClick={() => {
                                handlePinned(todo.id, todo.title, todo.pinned);
                              }}
                              // className={styles.delete}
                            >
                              Remove to Pin
                            </button>
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* pin to todo sonu */}
                  </li>
                ) : (
                  ""
                );
              })}
            </ul>
            <hr />
          </div>
          <div>
            <h6 className={styles.todolist}>Todo List Items</h6>
            <ul className="px-5 py-2">
              {todoList.length > 0
                ? todoList
                    .filter((f) => f.pinned !== true && f.checked !== true)

                    .map((todo, index) => {
                      return todoEdit.isInput && todoEdit.id == todo.id ? (
                        <li
                          className={
                            styles.dotnone + " d-flex justify-content-between"
                          }
                          key={index}
                        >
                          <input
                            type="text"
                            className="form-control"
                            value={todoEdittext}
                            onChange={(e) => handleChangeValue(e)}
                          />
                          <button
                            className="btn btn-secondary"
                            onClick={() => todoSend(todo.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setTodoEdit({ isInput: false, id: "" });
                            }}
                          >
                            Cancel
                          </button>

                          {todoEdit?.isInput ? (
                            ""
                          ) : (
                            <div className="btn-group m-1">
                              <button
                                className="btn light dropdown rounded"
                                type="button"
                                data-bs-toggle="dropdown"
                                id="dropdownMenuButton1"
                                aria-expanded="false"
                              >
                                <b>... </b>
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a
                                    className="dropdown-item d-flex align-items-center"
                                    href="#"
                                  >
                                    <Icon
                                      icon="material-symbols:push-pin-outline"
                                      color="black"
                                    />
                                    <button
                                      onClick={() => {
                                        handlePinned(
                                          todo.id,
                                          todo.title,
                                          todo.pinned
                                        );
                                      }}
                                      // className={styles.delete}
                                    >
                                      Pin on the Top
                                    </button>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item d-flex align-items-center"
                                    href="#"
                                  >
                                    <Icon
                                      icon="material-symbols:autorenew"
                                      color="black"
                                    />
                                    <button
                                      onClick={() => {
                                        todoUpdate(todo.id, todo.title);
                                      }}
                                      // className={styles.delete}
                                    >
                                      Update
                                    </button>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item d-flex align-items-center"
                                    href="#"
                                  >
                                    <Icon
                                      icon="material-symbols:delete-outline"
                                      color="black"
                                    />
                                    {/* 
                            handle edit/ todo */}
                                    <button
                                      onClick={() => {
                                        handleDelete(todo);
                                      }}
                                      // className={styles.delete}
                                    >
                                      Delete
                                    </button>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        </li>
                      ) : (
                        <li
                          className="d-flex justify-content-between"
                          key={index}
                        >
                          <div className="align-self-center">{todo.title}</div>
                          <div className="btn-group m-1">
                            <button
                              className="btn light dropdown rounded align-self-center"
                              type="button"
                              data-bs-toggle="dropdown"
                              id="dropdownMenuButton1"
                              aria-expanded="false"
                            >
                              <b> ... </b>
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a
                                  className="dropdown-item d-flex align-items-center"
                                  href="#"
                                >
                                  <Icon
                                    icon="material-symbols:check-circle-outline-rounded"
                                    color="black"
                                  />

                                  <button
                                    className="btn border-none"
                                    onClick={() => {
                                      handleChecked(
                                        todo.id,
                                        todo.title,
                                        todo.checked
                                      );
                                    }}
                                    // className={styles.delete}
                                  >
                                    Checked
                                  </button>
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item d-flex align-items-center"
                                  href="#"
                                >
                                  <Icon
                                    icon="material-symbols:push-pin-outline"
                                    color="black"
                                  />
                                  <button
                                    className="btn border-none"
                                    onClick={() => {
                                      handlePinned(
                                        todo.id,
                                        todo.title,
                                        todo.pinned
                                      );
                                    }}
                                    // className={styles.delete}
                                  >
                                    Pin on the Top
                                  </button>
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item d-flex align-items-center"
                                  href="#"
                                >
                                  <Icon
                                    icon="material-symbols:autorenew"
                                    color="black"
                                  />
                                  <button
                                    className="btn border-none"
                                    onClick={() => {
                                      todoUpdate(todo.id, todo.title);
                                    }}
                                    // className={styles.delete}
                                  >
                                    Update
                                  </button>
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item d-flex align-items-center"
                                  href="#"
                                >
                                  <Icon
                                    icon="material-symbols:delete-outline"
                                    color="black"
                                  />
                                  {/* 
                              handle edit/ todo */}
                                  <button
                                    className="btn border-none"
                                    onClick={() => {
                                      handleDelete(todo);
                                    }}
                                    // className={styles.delete}
                                  >
                                    Delete
                                  </button>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      );
                    })
                : "Enter a todo item"}
            </ul>{" "}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Index;
