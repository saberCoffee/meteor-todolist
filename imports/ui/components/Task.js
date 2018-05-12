import React, { Component } from 'react';
 
// API
import { Tasks, handleTask } from '../../api/tasks.js';
  
export default class Task extends Component {
  /**
   * Met à jour le statut de la tâche courante
   */
  toggleChecked = () => {
    handleTask.updateChecked({
      taskId: this.props.task._id,
      checked: !this.props.task.checked
    });
  }
 
  /**
   * Supprime la tâche courante
   */
  deleteThisTask = () => {
    handleTask.delete({ taskId: this.props.task._id });
	}
		
  render() {
    let taskClassName = this.props.task.checked ? 'checked' : '';

    if (this.props.ghostCompleted && this.props.task.checked) {
      taskClassName += ' ghost';
    }
 
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
 
        <input
          id={this.props.task._id}
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked}
        />
 
        <label htmlFor={this.props.task._id}><span className="text">{this.props.task.text}</span></label>
      </li>
    );
  }
}