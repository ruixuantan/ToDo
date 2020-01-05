import React from 'react';
import TaskDate from './TaskDate'
import {arrayifyTags} from '../utils/utils'

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      dateline: '',
      is_completed: false,
      tag_string: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange = (date) => {
    this.setState({ dateline: date });
  }

  toggleChange = () => {
    this.setState({
      is_completed: !this.state.is_completed
    });
  }

  createTaskRequest = (event) => {

    const data = {
      description: this.state.description,
      dateline: this.state.dateline,
      is_completed: this.state.is_completed,
      tags_attributes: arrayifyTags(this.state.tag_string)
    };

    fetch('/api/v1/tasks', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    }).then((response) => {
      console.log(response)
      alert('Task created successfully');
      location.href = '/';
    });
  }

  render() {
    const {description, dateline, is_completed, tag_string} = this.state;
    return (
      <div>
        <h4>Add Task</h4>
        <div>
          <label>Description: </label>
          <input
            type='text'
            name='description'
            value={description}
            onChange={this.handleInputChange}
            />
        </div>
        <TaskDate handleDateChange = {this.handleDateChange.bind(this)} />
        <div>
          <label>Completed</label>
          <input
            type='checkbox'
            name='is_completed'
            value={is_completed}
            checked={this.state.is_completed}
            onChange={this.toggleChange}
            />
        </div>
        <div>
          <label>Tags: </label>
          <input
            type='text'
            name='tag_string'
            value = {tag_string}
            onChange={this.handleInputChange}
            />
        </div>
        <button onClick={this.createTaskRequest}>Add</button>
      </div>
    );
  }
}
