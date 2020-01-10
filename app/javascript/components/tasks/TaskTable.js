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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
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
                  <td>{task.id}</td>
                  <td>
                    <Link to={`/tasks/${task.id}`}>
                      {task.description}
                    </Link>
                  </td>
                  <td>{dateToString(task.dateline)}</td>
                  <td>{task.is_completed ? "Done" : "Pending" }</td>
                  <td>
                    <Link to={`/tasks/${task.id}/edit`}>
                      Edit
                    </Link>
                    <button onClick={() => this.props.handleDelete(task.id) }>
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
