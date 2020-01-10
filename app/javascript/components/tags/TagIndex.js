import React from "react";
import { Redirect } from "react-router-dom";
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
      .then((response) => this.setState({ tags: response.data }));
  };

  handleDelete = (tagId) => {
  axios.delete(`/api/v1/tags/${tagId}`)
     .then((response) => {
       alert("Tag deleted successfully")
       this.fetchTagsList();
     });
   }

   handleFilter = (event) => {
     this.setState({ searchTag: event.target.value })
   }

  render() {
    let tags = this.state.tags.filter((tag) => {
      return tag.name.includes(this.state.searchTag.toLowerCase())
    });

    return (
      <div>
        <NavBar />
        <FilterBar handleFilter = {this.handleFilter.bind(this)}/>
        <CreateTag />
        <h3>All Tags</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
          {
            tags.map((tag) => {
              return (
                <tr key={tag.id}>
                  <td>{tag.id}</td>
                  <td>{tag.name}</td>
                  <td>
                    <button onClick={() => this.handleDelete(tag.id)}>
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
