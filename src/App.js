import { useSelector } from "react-redux";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { useEffect, useState } from "react";

import ProtectedRoute from "./Routes/ProtectedRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Components/login/Login";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import TaskManager from "./Components/TaskManager/TaskManager";
import Users from "./Components/Users/Users";
import Header from "./Components/shared/Header";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
  //fetch from server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/UserData");
    const data = await res.json();
    // console.log(data);
    return data;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            exact
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            exact
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/task"
            exact
            element={
              <PrivateRoute>
                <TaskManager />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* 
      <Router>
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            exact
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            exact
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/task"
            exact
            element={
              <PrivateRoute>
                <TaskManager />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router> */}
      {/* <Router>
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            exact
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            exact
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/task"
            exact
            element={
              <PrivateRoute>
                <TaskManager />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router> */}
    </div>
  );
}

/*
 const protectedRoute = [
    {
      path: "/login",
      element: <Login />
    }
  ];

  const privateRoute = [
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/",
      element: <Home />
    }
  ];
 {privateRoute.map(({ path, element }) => (
            <Route
              path="/login"
              exact
              element={
                <ProtectedRoute>
                  {<Login />}
                </ProtectedRoute>
              }
            />
          ))}

          {protectedRoute.map(({ path, element }) => (
            <Route
              path="/logout"
              exact
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
          ))}
*/
