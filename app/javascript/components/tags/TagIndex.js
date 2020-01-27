import React from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import CreateTag from "./CreateTag";
import FilterBar from "../utils/FilterBar";
import NavBar from "../utils/NavBar";

export default class TagIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      searchTag: ""
    };
  }

  componentDidMount() {
    this.fetchTagsList();
  }

  fetchTagsList = () => {
    axios.get("/api/v1/tags")
      .then((response) => this.setState({tags: response.data}));
  };

  handleDelete = (tagId) => {
  axios.delete(`/api/v1/tags/${tagId}`)
     .then((response) => {
       alert("Tag deleted successfully")
       this.fetchTagsList();
     });
   }

   handleDeleteAll = (tagIds) => {
     tagIds.map((tagId) => {
       axios.delete(`/api/v1/tags/${tagId.id}`)
          .then((response) => {
            this.fetchTagsList();
          });
     })
    }

   handleFilter = (event) => {
     this.setState({searchTag: event.target.value})
   }

  render() {
    let tags = this.state.tags.filter((tag) => {
      return tag.name.includes(this.state.searchTag.toLowerCase())
    });

    return (
      <div>
        <br />
        <FilterBar handleFilter = {this.handleFilter.bind(this)}/>
        <br />
        <CreateTag />
        <br />
        <div className = "row">
          <h3 className = "col-3">All Tags</h3>
          <button
            className = "col-2 btn btn-danger"
            onClick = {() => this.handleDeleteAll(tags)}>
            Delete all filtered Tags
          </button>
        </div>
        <br />
        <table className = "table table-striped" id = "tag-index">
          <thead className = "thead-dark">
            <tr>
              <th className = "col-2">Tag</th>
	            <th className = "col-1">Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            tags.map((tag) => {
              return (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>
                    <button
                      className = "btn btn-danger"
                      onClick = {() => this.handleDelete(tag.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
