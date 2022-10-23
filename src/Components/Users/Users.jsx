import "./Users.css";
import { useEffect, useState } from "react";
import ButtonBtn from "../shared/ButtonBtn";
import ModalDialog from "../shared/ModalDialog";
import { FaTrashAlt, FaPen, FaRegFileAlt } from "react-icons/fa";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const Users = () => {
  const [isShow, invokeModal] = useState(false);
  const ShowModal = () => {
    return invokeModal(true);
  };
  const CloseModal = () => {
    setID(0);
    return invokeModal(false);
  };

  const [users, setUser] = useState([]);
  const [readonlyview, setReadonlyview] = useState(false);
  const [id, setID] = useState(0);
  const [User_name, setUser_name] = useState("");
  const [Password, setPassword] = useState("");
  const [Active, setActive] = useState(Boolean);
  const [User_type, setUser_type] = useState("");
  const [create_date, setCreate_date] = useState("");
  const [activation_date, setActivation_date] = useState("");
  const [deActication_date, setDeActication_date] = useState("");
  const [updated_date, setUpdated_date] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const UserFromServer = await fetchUser();
      setUser(UserFromServer);
    };

    getUsers();
  }, []);
  //fetch from server
  const fetchUser = async () => {
    const res = await fetch("http://localhost:7000/UserData");
    const data = await res.json();
    console.log(data);
    return data;
  };
  //fetch from server
  const fetchUserId = async (id) => {
    const res = await fetch(`http://localhost:7000/UserData/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };
  // Add new User db
  const onAdd = async (UserData) => {
    const res = await fetch(`http://localhost:7000/UserData`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(UserData),
    });
    if (res) {
      alertify.success("Add Successful");
    }
    const data = await res.json();
    setUser([...users, data]);
  };
  // Add new User
  const onSubmit = (e) => {
    e.preventDefault();
    if (!User_name) {
      alertify.error("User Name Is Requerd");
      return;
    } else if (!Password) {
      alertify.error("Password Is Requerd");
      return;
    } else if (!Active) {
      alertify.error("Active Is Requerd");
      return;
    } else if (!User_type) {
      alertify.error("User_type Is Requerd");
      return;
    } else if (!create_date) {
      alertify.error("create_date Is Requerd");
      return;
    } else if (!activation_date) {
      alertify.error("activation_date Is Requerd");
      return;
    } else if (!deActication_date) {
      alertify.error("deActication_date Is Requerd");
      return;
    } else if (!updated_date) {
      alertify.error("updated_date Is Requerd");
      return;
    }
    onAdd({
      User_name,
      Password,
      Active,
      User_type,
      create_date,
      activation_date,
      deActication_date,
      updated_date,
    });
    clearDataEdit();
    CloseModal();
  };
  // delete User
  const deleteUser = async (id) => {
    await fetch(`http://localhost:7000/UserData/${id}`, {
      method: "DELETE",
    });
    setUser(users.filter((user) => user.id !== id));
    console.log("delete", id);
  };
  //Edit User
  const getDataEdit = (e) => {
    console.log("data ", e);
    setUser_name(e.User_name);
    setActive(e.Active);
    setUser_type(e.User_type);
    setCreate_date(e.create_date);
    setActivation_date(e.activation_date);
    setDeActication_date(e.deActication_date);
    setUpdated_date(e.updated_date);
    return CloseModal();
  };
  const clearDataEdit = () => {
    setUser_name("");
    setPassword("");
    setActive(Boolean);
    setUser_type("");
    setCreate_date("");
    setActivation_date("");
    setDeActication_date("");
    setUpdated_date("");
  };
  const EditUser = async (id) => {
    console.log("id", id);
    const UpdateToUser = await fetchUserId(id);
    console.log("UpdateToUser", UpdateToUser);
    const updUser = {
      ...UpdateToUser,
      User_name,
      Active,
      User_type,
      create_date,
      activation_date,
      deActication_date,
      updated_date,
    };
    const res = await fetch(`http://localhost:7000/UserData/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updUser),
    });
    const data = await res.json();
    setUser(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              User_name: data.User_name,
              Active: data.Active,
              User_type: data.User_type,
              create_date: data.create_date,
              activation_date: data.activation_date,
              deActication_date: data.deActication_date,
              updated_date: data.updated_date,
            }
          : user
      )
    );
    console.log("data res", data);
    if (res) {
      alertify.success("Edit Successful");
    }
    setUser_name("");
    setActive(Boolean);
    setUser_type("");
    setCreate_date("");
    setActivation_date("");
    setDeActication_date("");
    setUpdated_date("");
    CloseModal();
  };
  // Edit Active
  const ActiveEdit = async (id) => {
    const ActiveEditUser = await fetchUserId(id);
    const updTask = { ...ActiveEditUser, Active: !ActiveEditUser.Active };
    // if (ActiveEditUser.User_type === "admin") {
    const res = await fetch(`http://localhost:7000/UserData/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    if (res) {
      alertify.success("Update status Successful");
    }
    setUser(
      users.map((user) =>
        user.id === id ? { ...user, Active: data.Active } : user
      )
    );
    // } else {
    //   alertify.error("Update status Successful");
    // }
  };

  const formsubmit = (e, viewOnly) => {
    console.log("e value", e);
    clearDataEdit();
    setReadonlyview(viewOnly);
    if (e !== 0) {
      console.log("edit form");
      getDataEdit(e);
      setID(e.id);
    }
    console.log(readonlyview);
    ShowModal();
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h2>List Users</h2>
          </div>
          <div className="btn-hedaer">
            <ButtonBtn
              className="btn"
              text={"Add"}
              onClick={() => formsubmit(0, false)}
            />
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Type</th>
              <th scope="col">Active</th>
              <th scope="col" className="text-center">
                Setting
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => (
              <tr key={data.id}>
                <th scope="row">{index + 1}</th>
                <td>{data.User_name}</td>
                <td>{data.User_type}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={data.Active}
                    value={Active}
                    onChange={() => ActiveEdit(data.id)}
                  />
                </td>
                <td className="icon">
                  <FaRegFileAlt
                    className="edit"
                    title="show"
                    onClick={() => formsubmit(data, true)}
                  />{" "}
                  <FaPen
                    className="edit"
                    title="edit"
                    onClick={() => formsubmit(data, false)}
                  />
                  <FaTrashAlt
                    title="Delete"
                    onClick={() => {
                      alertify.confirm(
                        "Delete Item",
                        "Do you want to delete the item.",
                        function () {
                          deleteUser(data.id);
                          alertify.success("Delete Successful ");
                        },
                        function () {
                          alertify.error("Cancel");
                        }
                      );
                    }}
                    className="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalDialog
          onShow={isShow}
          onOpen={ShowModal}
          OnClose={CloseModal}
          title={
            id !== 0 ? (readonlyview ? "View User" : "Edit User") : "Add User"
          }
          onSave={(e) =>
            id === 0 ? onSubmit(e) : readonlyview ? readonlyview : EditUser(id)
          }
          bodyModel={
            <div>
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="hidden"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        value={User_name}
                        onChange={(e) => setUser_name(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                      />
                      <span></span>
                      <label>Username</label>
                    </div>
                  </div>

                  {id !== 0 ? (
                    readonlyview ? (
                      ""
                    ) : (
                      ""
                    )
                  ) : (
                    <div className="col-md-6">
                      <div className="txt_field">
                        <input
                          type="password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={readonlyview ? true : false}
                        />
                        <span></span>
                        <label>Password</label>
                      </div>
                    </div>
                  )}
                  <div className="col-md-6">
                    <div className="txt_field">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setActive(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                        value={Active}
                      >
                        <option>Select Active</option>
                        <option value={true}>true</option>
                        <option value={false}>false</option>
                      </select>
                      <span></span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setUser_type(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                        value={User_type}
                      >
                        <option>Select User Type</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="date"
                        value={create_date}
                        onChange={(e) => setCreate_date(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                      />
                      <span></span>
                      <label>create_date</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="date"
                        value={activation_date}
                        onChange={(e) => setActivation_date(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                      />
                      <span></span>
                      <label>Activation_date</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="date"
                        value={deActication_date}
                        onChange={(e) => setDeActication_date(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                      />
                      <span></span>
                      <label>DeActication_date</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="date"
                        value={updated_date}
                        onChange={(e) => setUpdated_date(e.target.value)}
                        required
                        disabled={readonlyview ? true : false}
                      />
                      <span></span>
                      <label>updated_date</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          }
        ></ModalDialog>
      </div>
    </>
  );
};

export default Users;
