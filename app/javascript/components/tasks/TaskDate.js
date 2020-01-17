import React from "react";
import DateTime from "react-datetime";

export default class TaskDate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DateTime
        value = {this.props.dateline}
        timeFormat = {false}
        closeOnSelect = {true}
        onChange = {this.props.handleDateChange}/>
    );
  }
}
