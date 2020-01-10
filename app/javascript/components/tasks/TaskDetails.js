import React from "react";
import axios from "axios";
import NavBar from "../utils/NavBar";
import { stringifyTags, dateToString } from "../utils/utils";

export default class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: [] };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    axios.get(`/api/v1/tasks/${id}`)
      .then((response) => {
        this.setState({ task: response.data });
    })
  }

  render() {
    const { task } = this.state;
    return (
      <div>
        <NavBar />
        <div>
          <label> Description </label>
          <p> {task.description} </p>
        </div>

        <div>
          <label> Dateline </label>
          <p> {dateToString(task.dateline)} </p>
        </div>

        <div>
          <label> Completed? </label>
          <p> {task.is_completed ? "Done" : "Pending" } </p>
        </div>

        <div>
          <label> Tags </label>
          <p> {stringifyTags(task.tags)} </p>
        </div>

      </div>
    );
  }
}
