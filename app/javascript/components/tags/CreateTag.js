import React from 'react';

export default class CreateTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleInputChange = (event) => {
    this.setState({ name: event.target.value });
  }

  createTagRequest = (event) => {
    fetch('/api/v1/tags', {
      method: 'post',
      body: JSON.stringify({ name: this.state.name }),
      headers: { 'Content-Type': 'application/json'}
    }).then((response) => {
      alert('Task created successfully');
      location.href = '/tags';
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <h4>Add Tag</h4>
        <div>
          <label>Tag Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={this.handleInputChange}
            />
        </div>
        <button onClick={this.createTagRequest}>Add</button>
      </div>
    );
  }
}
