import React from "react";
import TaskDate from "./TaskDate";
import axios from "axios";
import TagInput from "../tags/TagInput";
import {objectifyTags} from "../utils/utils";

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
    this.setState({[event.target.name]: event.target.value});
  }

  handleDateChange = (date) => {
    this.setState({dateline: date});
  }

  toggleChange = () => {
    this.setState({is_completed: !this.state.is_completed});
  }

  handleTagChange = (tagsPassed) => {
    this.setState({tags: tagsPassed});
  }

  createTaskRequest = (event) => {
    axios.post("/api/v1/tasks", {
      description: this.state.description,
      dateline: this.state.dateline,
      is_completed: this.state.is_completed,
      tags_attributes: objectifyTags(this.state.tags)
    },
    {validateStatus: (status) => {return true;}
    }).then((response) => {
      alert("Task created successfully");
      location.href = "/dashboard";
    });
  }

  render() {
    const {description, dateline, is_completed, tag_string} = this.state;
    return (
      <div className = "modal-body">
        <div className = "modal-dialog">
          <div className = "modal-content">

            {/*Modal Header*/}
            <div className = "modal-header">
              <h6 className = "modal-title">Add Task</h6>
              <button type = "button" className = "close" data-dismiss = "modal">
                &times;
              </button>
            </div>

            {/*Modal Body*/}
            <div className = "modal-body">
              <div className = "form-group">
                <label>Description:</label>
                <input
                  className = "form-control"
                  type = "text"
                  name = "description"
                  value = {description}
                  onChange = {this.handleInputChange}
                  />
              </div>
              <div className = "form-group">
                <label>Dateline:</label>
                <TaskDate handleDateChange = {this.handleDateChange.bind(this)} />
              </div>
              <div className = "form-group">
                <label>Completed</label>
                <input
                  type = "checkbox"
                  name = "is_completed"
                  value = {is_completed}
                  checked = {this.state.is_completed}
                  onChange = {this.toggleChange}
                  />
              </div>
              <div className = "form-group">
                <label>Tags:</label>
                <TagInput handleTagChange = {this.handleTagChange.bind(this)}/>
              </div>


              {/*Modal Footer*/}
              <div className = "modal-footer">
                <button type = "button" className = "btn btn-danger"
                  data-dismiss = "modal">
                  Close
                </button>
                <button
                  className = "btn btn-primary" onClick = {this.createTaskRequest}>
                  Add
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
