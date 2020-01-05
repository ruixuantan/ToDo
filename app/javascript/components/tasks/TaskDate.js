import React from 'react';
import DateTime from 'react-datetime';
import '../../stylesheets/Datetime.css';

//note: to change handleDateChange in parent components. Don't break abstraction
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
    )
  }
}
