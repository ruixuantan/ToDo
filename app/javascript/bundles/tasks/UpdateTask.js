import React from 'react';

export default class UpdateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      dateline: '',
      is_completed: false
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

  updateTaskRequest = (event) => {
    fetch(`/api/v1/tasks/${this.state.id}`, {
      method: 'put',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Task updated successfully');
      location.href = '/';
    });
  }

  render() {
    const {description, dateline, is_completed} = this.state;
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
          <label>Completed?</label>
          <input
            type='text'
            name='is_completed'
            value={is_completed}
            onChange={this.handleInputChange}
            />
        </div>
        <button onClick={this.updateTaskRequest}>Update</button>
      </div>
    );
  }
}
