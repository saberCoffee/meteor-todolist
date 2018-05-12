import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

// API
import { handleTask } from '../../api/tasks.js';

// Components
import Task from '../components/Task.js';
 
export default class ListPage extends Component { 
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false
    };
  }
   
  /**
   * Gère le formulaire
   */
	handleSubmit = (event) => {
    event.preventDefault();
 
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    handleTask.create({
      listId: this.props.list._id,
      text
    });
 
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
  
  /**
   * Affiche les tâches de la liste, et éventuellement filtre celles qui sont déjà terminées
   */
  renderTasks() {
    const { hideCompleted } = this.state;
    let tasks = this.props.tasks;
		
    if (this.state.hideCompleted) {
      tasks = tasks.filter(task => !task.checked);
    }

    if (!tasks.length) {
      return (
        <p className="noResult">Cette liste n'a aucune tâche en cours.</p>
      );
    }
		
		return (
      <ul>
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>
    );
  }

  /**
   * Affiche le nombre de tâches en cours, ou un message si elles sont toutes terminées
   */
  renderTasksCount() {
    const { completeCount, tasks } = this.props;
    const inprogress = tasks.length - completeCount;
    let s = inprogress > 1 ? 's' : '';
    let text = inprogress ? `${inprogress} tâche${s} restante${s}` : 'Liste terminée';
    return `(${text})`;
  }
 
  render() {
    const { list, tasks, error, loading, history, completeCount } = this.props;

    return (
      <div className="container">
        <header>
          <h2>
            <Link to="/"><i className="fas fa-arrow-left"></i></Link> {loading ? null : `${list.title} ${this.renderTasksCount()}`}
          </h2>				
 
          <form className="new-task" onSubmit={this.handleSubmit}>
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted}
              />
              Cacher les tâches terminées
            </label>	
            <input
              type="text"
              ref="textInput"
              placeholder="Ajouter une nouvelle tâche"
            />
          </form>
        </header>
        {loading ? null : this.renderTasks()}
      </div>
    );
  }
}

ListPage.propTypes = {
  list: PropTypes.object,
  tasks: PropTypes.array,
  loading: PropTypes.bool,
  listExists: PropTypes.bool,
  handleTask: PropTypes.object
};