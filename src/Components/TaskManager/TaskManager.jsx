import React from "react";

import { useState, useEffect } from "react";
import ButtonBtn from "../shared/ButtonBtn";
import ModalDialog from "../shared/ModalDialog";
import { FaTrashAlt, FaPen, FaRegFileAlt } from "react-icons/fa";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import Select from "react-select";

const TaskManager = () => {
  const [isShow, invokeModal] = useState(false);
  const ShowModal = () => {
    return invokeModal(true);
  };
  const CloseModal = () => {
    return invokeModal(false);
  };
  const [isShowEdit, EditModal] = useState(false);
  const ShowModalEdit = () => {
    return EditModal(true);
  };
  const CloseModalEdit = () => {
    return EditModal(false);
  };
  const [tasks, setTasks] = useState([]);
  const [id, setID] = useState("");
  const [task_name, setTask_name] = useState("");
  const [task_date, setTask_date] = useState("");
  const [actions, setActions] = useState("");

  const options = [
    { value: "goingToThePark", label: "goingToThePark" },
    { value: "FinishHomeWork", label: "FinishHomeWork" },
    { value: "CallMyFather", label: "CallMyFather" },
    {
      value: "bringGiftToMySisitrtBirthday ",
      label: "bringGiftToMySisitrtBirthday ",
    },
  ];

  useEffect(() => {
    const getTasks = async () => {
      const UserFromServer = await fetchTasks();
      setTasks(UserFromServer);
    };

    getTasks();
  }, []);
  //fetch from server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/UserTask");
    const data = await res.json();
    console.log(data);
    return data;
  };
  // console.log("tasks", tasks);

  //fetch from server
  const fetchTaskId = async (id) => {
    const res = await fetch(`http://localhost:5000/UserTask/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };
  // Add new User db
  const onAdd = async (UserTask) => {
    const res = await fetch(`http://localhost:5000/UserTask`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(UserTask),
    });
    if (res) {
      alertify.success("Add Successful");
    }
    const data = await res.json();
    setTasks([...tasks, data]);
  };
  // Add new User
  const onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (!task_name) {
      alertify.error("Task Name Is Requerd");
      return;
    } else if (!task_date) {
      alertify.error("task_date Is Requerd");
      return;
    } else if (!actions) {
      alertify.error("actions Is Requerd");
      return;
    }
    onAdd({
      task_name,
      task_date,
      actions,
    });
    setTask_name("");
    setTask_date("");
    setActions("");
    CloseModal();
  };
  // delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/UserTask/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("delete", id);
  };
  //Edit User
  const getDataEdit = (e) => {
    console.log("data ", e);
    setID(e.id);
    setTask_name(e.task_name);
    setTask_date(e.task_date);
    setActions(e.actions);
    return ShowModalEdit();
  };
  const EditTask = async (id) => {
    console.log("id", id);
    const UpdateToTask = await fetchTaskId(id);
    console.log("UpdateToTask", UpdateToTask);
    const updTask = {
      ...UpdateToTask,
      task_name,
      task_date,
      actions,
    };
    const res = await fetch(`http://localhost:5000/UserTask/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              task_name: data.task_name,
              task_date: data.task_date,
              actions: data.actions,
            }
          : task
      )
    );
    console.log("data res", data);
    if (res) {
      alertify.success("Edit Successful");
    }
    setTask_name("");
    setTask_date("");
    setActions("");
    CloseModal();
    CloseModalEdit();
  };

  const handleChange = (e) => {
    setActions(e.map((item) => item.value));
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h2>List Task Manager</h2>
          </div>
          <div className="btn-hedaer">
            <ButtonBtn className="btn" text={"add"} onClick={ShowModal} />
          </div>
        </div>
        <div className="main-table">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task Name</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
                <th scope="col" className="text-center">
                  Setting
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((data, index) => (
                <tr key={data.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.task_name}</td>
                  <td>{data.task_date}</td>
                  <td>{data.actions.toString()}</td>
                  <td className="icon">
                    <FaRegFileAlt
                      className="edit"
                      title="edit"
                      onClick={() => getDataEdit(data)}
                    />
                    <FaPen
                      className="edit"
                      title="edit"
                      onClick={() => getDataEdit(data)}
                    />{" "}
                    <FaTrashAlt
                      title="Delete"
                      onClick={() => {
                        alertify.confirm(
                          "Delete Item",
                          "Do you want to delete the item.",
                          function () {
                            deleteTask(data.id);
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
        </div>

        {/* Model Add Data Users */}
        <ModalDialog
          onShow={isShow}
          onOpen={ShowModal}
          OnClose={CloseModal}
          title="Add Task"
          onSave={onSubmit}
          bodyModel={
            <>
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="text"
                        value={task_name}
                        onChange={(e) => setTask_name(e.target.value)}
                        required
                      />
                      <span></span>
                      <label>Task Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="date"
                        value={task_date}
                        onChange={(e) => setTask_date(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <Select
                        isMulti
                        name="colors"
                        options={options}
                        onChange={(options) => handleChange(options)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </>
          }
        ></ModalDialog>

        {/* Model Edit Data Users */}
        <ModalDialog
          onShow={isShowEdit}
          onOpen={ShowModalEdit}
          OnClose={CloseModalEdit}
          title="Edit Task"
          onSave={() => EditTask(id)}
          bodyModel={
            <>
              <form onSubmit={() => EditTask(id)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="text"
                        value={task_name}
                        onChange={(e) => setTask_name(e.target.value)}
                        required
                      />
                      <span></span>
                      <label>Task Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <input
                        type="date"
                        value={task_date}
                        onChange={(e) => setTask_date(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="txt_field">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setActions(e.target.value)}
                        value={actions}
                      >
                        <option value="goingToThePark">goingToThePark</option>
                        <option value="FinishHomeWork">FinishHomeWork</option>
                        <option value="CallMyFather">CallMyFather</option>
                        <option value="bringGiftToMySisitrtBirthday">
                          bringGiftToMySisitrtBirthday
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </>
          }
        ></ModalDialog>
      </div>
    </>
  );
};

export default TaskManager;
