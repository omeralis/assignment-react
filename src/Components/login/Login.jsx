import { useState, useEffect } from "react";
import { login } from "../../features/UserSlice";
import { useDispatch } from "react-redux";
import "./login.css";
const LoginComponent = () => {
  const dispatch = useDispatch();
  const [users, setUser] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  useEffect(() => {
    const getUsers = async () => {
      const UserFromServer = await fetchUser();
      setUser(UserFromServer);
    };
    getUsers();
  }, []);
  //  fetch from server
  const fetchUser = async () => {
    const res = await fetch("http://localhost:7000/UserData");
    const data = await res.json();
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var { user_name, password } = document.forms[0];
    // Find user login info
    console.log(users);
    const userData = users.find((user) => user.user_name === user_name.value);
    console.log("userData", userData);
    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        console.log("Invalid password");
        // setErrorMessages({ name: "password", message: errors.password });
      } else {
        // setIsSubmitted(true);
        setUser(userData);
        dispatch(login(userData));
        // dispatch(getData(userData));
      }
    } else {
      // Username not found
      // setErrorMessages({ name: "user_name", message: errors.user_name });
      console.log("username not found");
    }
  };
  console.log(users);
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.user_name && (
      <div className="error">{errorMessages.message}</div>
    );
  return (
    <div className="login-form">
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              id="user_name"
              name="user_name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              // placeholder="user_name "
            />
            {renderErrorMessage("uname")}
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              // placeholder="Password"
            />
            {renderErrorMessage("pass")}
            <span></span>
            <label>Password</label>
          </div>
          <input type="submit" className="singin" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
