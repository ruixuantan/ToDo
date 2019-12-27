import React from 'react';
import {Redirect} from 'react-router-dom';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      dateline: '',
      is_posted: true
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  createTaskRequest = (event) => {
    console.log('this.state', this.state);
    fetch('/api/v1/tasks', {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Task created successfully');
      location.href = '/';
    });
  }

  render() {
    const {description, dateline, is_posted} = this.state;
    return (
      <div>
        <h3>New Task</h3>
        <div>
          <label>Description: </label>
          <input
            type='text'
            name='description'
            value={description}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>Dateline: </label>
          <input
            type='text'
            name='dateline'
            value={dateline}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>Is Posted: </label>
          <input
            type='text'
            name='is_posted'
            value={is_posted}
            onChange={this.handleInputChange}
            />
        </div>
        <button onClick={this.createTaskRequest}>Create</button>
      </div>
    );
  }
}
