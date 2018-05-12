import { Mongo } from 'meteor/mongo';
 
export const Lists = new Mongo.Collection('lists');

/**
 * Créé une nouvelle liste
 * @param {String}  title  Le titre de la nouvelle liste
 */
const createList = ({ title }) => {
  Meteor.call('lists.createList', { title }, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // success!
    }
  });
};

export const handleList = {
  create: createList
};