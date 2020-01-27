import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import FilterBar from "../utils/FilterBar";
import CreateTask from "./CreateTask";
import TaskTable from "./TaskTable";
import {stringifyTags, dateToString} from "../utils/utils";

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      searchTag: ""
    };
  }

  componentDidMount() {
    this.fetchTasksList();
  }

  fetchTasksList = () => {
    axios.get("/api/v1/tasks")
      .then((response) => this.setState({tasks: response.data}));
  };

  handleDelete = (taskId) => {
    axios.delete(`/api/v1/tasks/${taskId}`)
       .then((response) => {
         alert("Task deleted successfully")
         this.fetchTasksList();
    });
  }

   handleFilter = (event) => {
     this.setState({searchTag: event.target.value})
   }

  render() {
    //filter tasks for tags that contains a name equal to searchTag
    let filteredTags = this.state.tasks.filter((task) => {
      if (this.state.searchTag == "") {
        return true;
      } else {
        for (let i = 0; i < task.tags.length; i++) {
          if (task.tags[i].name.includes(this.state.searchTag.toLowerCase())) {
            return true;
          }
        }
      }
    });

    return (
      <div>
        <FilterBar handleFilter = {this.handleFilter.bind(this)}/>
        <br />
        <h3>All Tasks</h3>
        <TaskTable
          all_tasks = {filteredTags}
          handleDelete = {this.handleDelete.bind(this)}
          />
        </div>
    );
  }
}
