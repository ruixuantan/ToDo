import React from "react";
import TaskDate from "./TaskDate";
import axios from "axios";
import NavBar from "../utils/NavBar";
import TagInput from "../tags/TagInput";
import { objectifyTags } from "../utils/utils";

export default class UpdateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      dateline: "",
      is_completed: false,
      tags: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    axios.get(`/api/v1/tasks/${id}`)
      .then((response) => {
        this.setState({ ...response.data });
    })
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange = (date) => {
    this.setState({ dateline: date });
  }

  toggleChange = () => {
    this.setState({is_completed: !this.state.is_completed});
  }

  handleTagAddition = (tagsPassed) => {
    this.setState({ tags: tagsPassed });
  }

  updateTaskRequest = (event) => {
    axios.put( `/api/v1/tasks/${this.state.id}`,
      {
        description: this.state.description,
        dateline: this.state.dateline,
        is_completed: this.state.is_completed,
        tags: objectifyTags(this.state.tags)
      },
      {validateStatus: (status) => { return true;}
    }).then((response) => {
      alert("Task updated successfully");
      location.href = "/dashboard";
    }).catch(error => {
      console.log("update errors", error);
    });
  }

  render() {
    const {description, dateline, is_completed, tags} = this.state;
    return (
      <div>
        <h3>{description}</h3>
        <div class = "form-group">
          <label>Description:</label>
          <input
            class = "form-control"
            type = "text"
            name = "description"
            value = { description }
            onChange = { this.handleInputChange }
            />
        </div>
        <div class = "form-group">
          <label>Dateline:</label>
          <TaskDate
            dateline = { this.state.dateline }
            handleDateChange = { this.handleDateChange.bind(this)  }
            />
        </div>
        <div class = "form-group">
          <label>Completed</label>
          <input
            type = "checkbox"
            name = "is_completed"
            value = { is_completed }
            checked = { this.state.is_completed }
            onChange = { this.toggleChange }
            />
        </div>
        <div class = "form-group">
          <label>Tags: </label>
          <TagInput
            initialTags = { this.state.tags }
            handleTagAddition = { this.handleTagAddition }
            />
        </div>
        <button
          class = "btn btn-primary"
          onClick = { this.updateTaskRequest }>
          Update
        </button>
      </div>
    );
  }
}
