import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Tasks from './components/tasks/index';
import TaskDetails from './components/tasks/TaskDetails';
import UpdateTask from './components/tasks/UpdateTask';
import Tags from './components/tags/TagIndex'

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <Tasks />
      </Route>
      <Route
        path="/tasks/:id/edit"
        exact
        component={UpdateTask}
        />
      <Route
        path="/tasks/:id"
        exact
        component={TaskDetails}
       />
       <Route
         path="/tags"
         exact
         component={Tags}
        />
    </Switch>
  );
}
