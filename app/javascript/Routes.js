import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Tasks from './bundles/tasks/index';
import TaskDetails from './bundles/tasks/TaskDetails';
import CreateTask from './bundles/tasks/CreateTask';
import UpdateTask from './bundles/tasks/UpdateTask';

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <Tasks />
      </Route>
      <Route
        path="/tasks/new"
        exact
        component={CreateTask}
        />
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
    </Switch>
  );
}
