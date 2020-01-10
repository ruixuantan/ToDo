import React from "react";
import axios from "axios";
import TagInput from "./TagInput";

export default class CreateTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  handleTagAddition = (tagsPassed) => {
    this.setState({ tags: tagsPassed });
  }

  createTagRequest = (event) => {
    this.state.tags.map(tag =>
      axios.post("/api/v1/tags", { name: tag }))

    alert("Tag created successfully");
    location.href = "/tags";
  }

  render() {
    return (
      <div>
        <h4>Add Tags</h4>
        <TagInput handleTagAddition = {this.handleTagAddition}/>
        <button onClick={this.createTagRequest}>Add</button>
      </div>
    );
  }
}
