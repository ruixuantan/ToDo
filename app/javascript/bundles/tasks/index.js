import React from 'react';
import { Link } from 'react-router-dom';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  componentDidMount() {
    this.fetchTasksList();
  }

  fetchTasksList = () => {
    fetch('/api/v1/tasks').
      then((response) => response.json()).
      then((tasks) =>  this.setState({ tasks }));
  };

  handleDelete = (taskId) => {
   fetch(`/api/v1/tasks/${taskId}`, { method: 'delete' }).
     then((response) => {
       alert('Task deleted successfully')
       this.fetchTasksList();
     });
 }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h3>All Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Dateline</th>
              <th>Is Posted</th>
              <th>Actions</th>
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
                  <td>{task.dateline}</td>
                  <td>{task.is_posted ? 'Yes' : 'No' }</td>
                  <td>
                    <Link to={`/tasks/${task.id}/edit`}>
                      Edit
                    </Link>
                    <button onClick={() => this.handleDelete(task.id) }>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <Link to={`/tasks/new`}>
          New Task
        </Link>
      </div>
    );
  }
}
