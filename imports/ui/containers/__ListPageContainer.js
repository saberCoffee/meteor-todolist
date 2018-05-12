import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Mongo } from 'meteor/mongo'
import { withTracker } from 'meteor/react-meteor-data';

// API
import { Lists } from '../../api/lists.js';
import { Tasks } from '../../api/tasks.js';

// UI
import ListPage from '../components/ListPage';

const INITIAL_STATE = {
  data: {},
  error: null,
  fetching: true
}

export function fetchData(id) {
  let newState = {};
  
  if (/^[a-f\d]{24}$/i.test(id)) {
    const listId = new Mongo.ObjectID(id);

    const list = Lists.findOne({"_id" : listId});

    if (!list) {
      newState = {
        error: new Meteor.Error(403, "Cette liste n'existe pas."),
        fetching: false
      };
    } else {
      newState = {
        data: {
          list,
          tasks: Tasks.find({"list_id" : listId}, { sort: { createdAt: -1 } }).fetch(),
          incompleteCount: Tasks.find({ 
            "list_id" : listId,
            "checked": { $ne: true } 
          }).count()          
        },
        fetching: false
      };
    }
  } else {
    newState = {
      error: new Meteor.Error(403, "L'identifiant de cette liste est invalide."),
      fetching: false
    }
  }

  console.log(newState)

  console.log({...newState, ...INITIAL_STATE})

  return {...newState, ...INITIAL_STATE};
}

export default ListPageContainer = withTracker(props => fetchData(props.match.params.id))(ListPage);