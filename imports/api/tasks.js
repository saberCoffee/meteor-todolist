import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');

/**
 * Créé une nouvelle tâche
 * @param {String}  listId  L'identifiant de la liste à laquelle appartient la tâche
 * @param {String}  text    Le contenu de la nouvelle tâche
 */
const createTask = ({ listId, text }) => {
  Meteor.call('tasks.createTask', {
    listId, text
  }, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // success!
    }
  });
};

/**
 * Met à jour la propriété "checked" d'une tâche
 * @param {String}  taskId  L'identifiant de la tâche à mettre à jour
 * @param {Boolean} checked Le statut de la tâche
 */
const updateChecked = ({ taskId, checked }) => {
  Meteor.call('tasks.updateChecked', {
    taskId, checked
  }, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // success!
    }
  });    
};

/**
 * Supprime une tâche
 * @param {String}  taskId  L'identifiant de la tâche à supprimer
 */
const deleteTask = ({ taskId }) => {
  Meteor.call('tasks.deleteTask', { taskId }, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // success!
    }
  });    
};

export const handleTask = {
  create: createTask,
  updateChecked: updateChecked,
  delete: deleteTask
};