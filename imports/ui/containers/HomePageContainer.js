import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
// API
import { Lists } from '../../api/lists.js';
import { Tasks } from '../../api/tasks.js';

// UI
import HomePage from '../components/HomePage';

export default HomePageContainer = withTracker(props => {
  const listsSubscription = Meteor.subscribe('allLists');
  const lists = Lists.find({}, { sort: { createdAt: -1 } }).fetch(); 
  const listsExists = !loading && lists.length;
  
  let loading = !listsSubscription.ready();

  // Récupère les tâches de chaque liste existante
  lists.forEach(list => {    
    let tasksSubscription = Meteor.subscribe('tasksFromList', list._id);
    list.tasks = Tasks.find({ "listId": list._id }).fetch();
    list.completeCount = Tasks.find({ 
      "listId" : list._id,
      "checked": { $ne: false } 
    }).count();

    loading = !tasksSubscription.ready();
  });

  return {
    loading,
    lists: listsExists ? lists : []
  };
})(HomePage);