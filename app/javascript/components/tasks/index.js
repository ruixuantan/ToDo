import React from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../utils/FilterBar'
import CreateTask from './CreateTask'
import TaskTable from './TaskTable'
import Tags from '../tags/TagIndex'
import { stringifyTags, dateToString } from '../utils/utils';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      searchTag: ''
    };
  }

  componentDidMount() {
    this.fetchTasksList();
  }

  fetchTasksList = () => {
    fetch('/api/v1/tasks').
      then((response) => response.json()).
      then((tasks) =>  this.setState({ tasks }));
  };

  handleDelete = (taskId) => {
   fetch(`/api/v1/tasks/${taskId}`, { method: 'delete' }).
     then((response) => {
       alert('Task deleted successfully')
       this.fetchTasksList();
     });
   }

   handleFilter = (event) => {
     this.setState({ searchTag: event.target.value })
   }

  render() {
    //filter tasks for tags that contains a name equal to searchTag
    let filteredTags = this.state.tasks.filter((task) => {
      if (this.state.searchTag == '') {
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
        <Link to = {'/tags'}>Manage Tags</Link>
        <FilterBar handleFilter = {this.handleFilter.bind(this)}/>
        <CreateTask />
        <h3>All Tasks</h3>
        <TaskTable
          all_tasks = {filteredTags}
          handleDelete = {this.handleDelete.bind(this)}
          />
        </div>
    );
  }
}
