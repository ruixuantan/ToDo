import React from "react";
import Tasks from "./components/tasks/index";
import CreateTask from "./components/tasks/CreateTask";

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <br />
        <button type = "button" className = "btn btn-primary"
          data-toggle = "modal" data-target = "#addtask-modal">
          + Add Task
        </button>

        <div className = "modal" id = "addtask-modal">
          <CreateTask />
        </div>
        <br />
        <br />
        <Tasks />
      </div>
    );
  };
}
