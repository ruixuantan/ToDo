import React from 'react';

export default function FilterBar(props) {
  return (
    <div>
      <h3>FilterBar</h3>
      <input onChange = {props.handleFilter} type = "text"/>
    </div>
  );
}
