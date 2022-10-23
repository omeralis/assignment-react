import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Components/login/Login";
import Logout from "./Components/Logout";
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
    const res = await fetch("http://localhost:7000/UserData");
    const data = await res.json();
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
                <Users UserData={tasks} />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            exact
            element={
              <PrivateRoute>
                <Users UserData={tasks} />
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
    </div>
  );
}
