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
        <div>
          <h5> Description </h5>
          <p> {task.description} </p>
        </div>

        <div>
          <h5> Dateline </h5>
          <p> {dateToString(task.dateline)} </p>
        </div>

        <div>
          <h5> Completed? </h5>
          <p> {task.is_completed ? "Done" : "Pending" } </p>
        </div>

        <div>
          <h5> Tags </h5>
          <p> {stringifyTags(task.tags)} </p>
        </div>

      </div>
    );
  }
}
