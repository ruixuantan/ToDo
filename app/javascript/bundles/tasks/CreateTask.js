import React from 'react';
import {Redirect} from 'react-router-dom';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      dateline: '',
      is_completed: false,
      name: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  createTaskRequest = (event) => {

    //post tag first
    fetch('/api/v1/tags', {
      method: 'post',
      body: JSON.stringify({name: this.state.name}),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      location.href = '/';
      console.log('Tag Created');
    });

    fetch('/api/v1/tasks', {
      method: 'post',
      body: JSON.stringify({
        description: this.state.description,
        dateline: this.state.dateline,
        is_completed: this.state.is_completed,
        tags: [{name: this.state.name.toLowerCase()}]
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      location.href = '/';
      alert('Task created successfully');
    });
  }

  render() {
    const {description, dateline, is_completed, name} = this.state;
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
          <label>Completed?: </label>
          <input
            type='text'
            name='is_completed'
            value={is_completed}
            onChange={this.handleInputChange}
            />
        </div>

        <div>
          <label>Tags: </label>
          <input
            type='text'
            name='name'
            value = {name}
            onChange={this.handleInputChange}
            />
        </div>

        <button onClick={this.createTaskRequest}>Create</button>
      </div>
    );
  }
}
