import React from "react";
import { Link } from "react-router-dom";
import { stringifyTags, dateToString } from "../utils/utils";

export default class TaskTable extends React.Component {
  constructor(props) {
    super(props);
  }

 render() {
   const tasks = this.props.all_tasks;
    return (
      <div>
        <table class = "table table-striped">
          <thead class = "thead-dark">
            <tr>
              <th>Task</th>
              <th>Dateline</th>
              <th>Completed?</th>
              <th>Actions</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
          {
            tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>
                    <Link to={`/tasks/${task.id}`}>
                      {task.description}
                    </Link>
                  </td>
                  <td>{dateToString(task.dateline)}</td>
                  <td>{task.is_completed ? "Done" : "Pending" }</td>
                  <td>
                    <Link to={`/tasks/${task.id}/edit`}
                    class="btn btn-info">
                      Edit
                    </Link>
                    <button
                      class="btn btn-danger"
                      onClick={() => this.props.handleDelete(task.id) }>
                      Delete
                    </button>
                  </td>
                  <td>
                    {stringifyTags(task.tags)}
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
