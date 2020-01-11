import React from "react";
import DateTime from "react-datetime";
import "../../stylesheets/Datetime.css";

export default class TaskDate extends React.Component {

  render() {
    return (
      <div>
        <label>Dateline: </label>
        <DateTime
          value = {this.props.dateline}
          timeFormat = {false}
          closeOnSelect = {true}
          onChange = {this.props.handleDateChange}/>
      </div>
    );
  }
}
