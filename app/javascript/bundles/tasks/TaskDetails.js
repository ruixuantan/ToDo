import React from 'react';
import { stringifyTags } from './utils';

export default class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: {} };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/tasks/${id}`).
      then((response) => response.json()).
      then((task) => this.setState({ task }));
  }

  render() {
    const { task } = this.state;
    console.log(task)
    return (
      <div>
        <div>
          <label> Description </label>
          <p> {task.description} </p>
        </div>

        <div>
          <label> Dateline </label>
          <p> {task.dateline} </p>
        </div>

        <div>
          <label> Completed? </label>
          <p> {task.is_completed ? 'Done' : 'Pending' } </p>
        </div>

        <div>
          <label> Tags </label>
          <p> {JSON.stringify(task.tags)} </p>
        </div>

      </div>
    );
  }
}
