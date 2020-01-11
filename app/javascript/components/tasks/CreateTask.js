import React from "react";
import TaskDate from "./TaskDate";
import axios from "axios";
import TagInput from "../tags/TagInput";
import { objectifyTags } from "../utils/utils";

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      dateline: "",
      is_completed: false,
      tags: []
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange = (date) => {
    console.log(date);
    this.setState({ dateline: date });
  }

  toggleChange = () => {
    this.setState({ is_completed: !this.state.is_completed });
  }

  handleTagAddition = (tagsPassed) => {
    this.setState({ tags: tagsPassed });
  }

  createTaskRequest = (event) => {
    axios.post("/api/v1/tasks", {
      description: this.state.description,
      dateline: this.state.dateline,
      is_completed: this.state.is_completed,
      tags_attributes: objectifyTags(this.state.tags)
    },
    { validateStatus: (status) => { return true; }
    }).then((response) => {
      alert("Task created successfully");
      location.href = "/dashboard";
    });
  }

  render() {
    console.log(this.props);
    const {description, dateline, is_completed, tag_string} = this.state;
    return (
      <div>
        <h4>Add Task</h4>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleInputChange}
            />
        </div>
        <TaskDate handleDateChange = {this.handleDateChange.bind(this)} />
        <div>
          <label>Completed</label>
          <input
            type="checkbox"
            name="is_completed"
            value={is_completed}
            checked={this.state.is_completed}
            onChange={this.toggleChange}
            />
        </div>
        <TagInput handleTagAddition = {this.handleTagAddition.bind(this)}/>
        <button onClick={this.createTaskRequest}>Add</button>
      </div>
    );
  }
}
