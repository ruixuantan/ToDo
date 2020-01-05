import React from 'react';
import TaskDate from './TaskDate'
import {arrayifyTags} from '../utils/utils'

export default class UpdateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      dateline: '',
      is_completed: false,
      tag_string: ''
    }
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/tasks/${id}`).
      then((response) => response.json()).
      then((task) => this.setState({ ...task }));
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

  updateTaskRequest = (event) => {

    fetch(`/api/v1/tasks/${this.state.id}`, {
      method: 'put',
      body: JSON.stringify({
        description: this.state.description,
        dateline: this.state.dateline,
        is_completed: this.state.is_completed,
        tags_attributes: arrayifyTags(this.state.tag_string)
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Task updated successfully');
      location.href = '/';
    });
  }

  render() {
    const {description, dateline, is_completed, tag_string} = this.state;
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
        <TaskDate dateline = {this.state.dateline} handleDateChange = {this.handleDateChange.bind(this)} />
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
          <label>Tags</label>
          <input
            type='text'
            name='tag_string'
            value={tag_string}
            onChange={this.handleInputChange}
            />
        </div>
        <button onClick={this.updateTaskRequest}>Update</button>
      </div>
    );
  }
}
