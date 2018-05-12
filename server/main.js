import { Meteor } from 'meteor/meteor';

import { Lists } from '../imports/api/lists.js';
import { Tasks } from '../imports/api/tasks.js';

Meteor.startup(() => {
  Meteor.publish('allLists', () => {
    return Lists.find({}, { sort: { createdAt: -1 } })
  });

  Meteor.publish('list', listId => {
    return Lists.find({ "_id": listId })
  });

  Meteor.publish('tasksFromList', listId => {
    return Tasks.find({ "listId": listId }, { sort: { createdAt: -1 } })
  });  

  Meteor.methods({
    'lists.createList'({ title }) {  
      Lists.insert({
        title,
        createdAt: new Date()
      });
    },    
    'tasks.createTask'({ listId, text }) {  
      Tasks.insert({
        listId,
        text,
        checked: false,
        createdAt: new Date()
      });
    },
    'tasks.deleteTask'({ taskId }) {
      const task = Tasks.findOne(taskId);

      Tasks.remove(taskId);
    },
    'tasks.updateChecked'({ taskId, checked }) {
      const task = Tasks.findOne(taskId);

      Tasks.update(taskId, {
        $set: { checked },
      });      
    }
  });
});
