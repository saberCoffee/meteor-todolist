import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

// API
import { Lists } from '../../api/lists.js';
import { Tasks } from '../../api/tasks.js';

// UI
import ListPage from '../components/ListPage';

export default ListPageContainer = withTracker(props => { 
  const listId = props.match.params.id;
  const listSubscription = Meteor.subscribe('list', listId);
  const tasksSubscription = Meteor.subscribe('tasksFromList', listId);     

  const loading = !listSubscription.ready() && !tasksSubscription.ready();

  const list = Lists.findOne({"_id": listId});
  const listExists = !loading && !!list;

  const tasks = Tasks.find({"listId": listId}, { sort: { createdAt: -1 } }).fetch();
  const tasksExists = !loading && tasks.length;
  const completeCount = Tasks.find({ 
    "listId" : listId,
    "checked": { $ne: false } 
  }).count();

  return {
    loading,
    list,
    listExists,
    tasks: tasksExists ? tasks : [],
    completeCount
  };
})(ListPage);