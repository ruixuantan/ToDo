import React from "react";
import {Redirect} from "react-router-dom";

export default class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tag_input: "",
      rendered: false //to check if props.initialTags has been rendered
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialTags !== prevProps.initialTags && !this.state.rendered) {
      this.setState({
        tags: this.props.initialTags,
        rendered: true
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({tag_input: event.target.value});
  }

  handleInputKeyDown = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      const {value} = event.target;

      this.setState(state => ({
        tags: [...state.tags, value],
        tag_input: ""
      }));
    }

    if (this.state.tags.length && event.keyCode === 8 && !this.state.tag_input.length) {
      this.setState(state => ({
        tags: state.tags.slice(0, state.tags.length - 1)
      }));
    }
  }

  handleRemoveItem = (index) => {
    return () => {
      this.setState(state => ({
        tags: state.tags.filter((item, i) => i !== index)
      }));
    }
  }

  sendTags = () => {
    this.props.handleTagChange(this.state.tags);
  }

  render() {
    return (
      <div>
        <label id = "tag-input-container">
          <ul id = "tag-input-ul">
            {this.state.tags.map((tagItem, i) =>
              <li key = {i} id = "tag-item"
                onMouseDown = {this.handleRemoveItem(i)}>
                {tagItem}
                <span> (x)</span>
              </li>
            )}
            <input
              id = "tag-input"
              placeholder = "hit enter to separate tags"
              value = {this.state.tag_input}
              onChange = {this.handleInputChange}
              onKeyDown = {this.handleInputKeyDown}
              onKeyUp = {this.sendTags}
              onMouseUp = {this.sendTags}
              />
            </ul>
        </label>
      </div>
    );
  }
}
