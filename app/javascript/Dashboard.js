import React from "react";
import { Link } from "react-router-dom";
import Tasks from "./components/tasks/index";
import CreateTask from "./components/tasks/CreateTask";
import NavBar from "./components/utils/NavBar";

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <br />
        <button type = "button" class = "btn btn-primary" data-toggle = "modal"
          data-target = "#addtask-modal">
          + Add Task
        </button>

        <div class = "modal" id = "addtask-modal">
          <CreateTask />
        </div>
        <br />
        <br />
        <Tasks />
      </div>
    );
  };
}
