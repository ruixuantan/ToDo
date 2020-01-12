import React from "react";
import { Redirect } from "react-router-dom";

export default class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tag_input: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({ tag_input: event.target.value });
  }

  handleInputKeyDown = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      const { value } = event.target;

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

  sendData = () => {
    this.props.handleTagAddition(this.state.tags);
  }

  render() {
    return (
      <div>
        <label id = "tag-input-container">
          <ul>
            {this.state.tags.map((item, i) =>
              <li key={i} id = "tag-item" onClick={this.handleRemoveItem(i)}>
                {item}
                <span> (x)</span>
              </li>
            )}
            <input
              id = "tag-input"
              placeholder = "hit enter to separate tags"
              value={this.state.tag_input}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
              onKeyUp={this.sendData}
              />
          </ul>
        </label>
      </div>
    );
  }
}
