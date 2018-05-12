import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

// API
import { handleList } from '../../api/lists.js';

// UI
import Loader from './Loader';

export default class HomePage extends Component {
  /**
   * Gère le formulaire
   */
	handleSubmit = (event) => {
    event.preventDefault();
 
    const title = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    handleList.create({ title });
 
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

  /**
   * Affiche la progression d'une liste
   */
  renderListProgress = ({ completeCount, tasks }) => {
    if (tasks && tasks.length) {
      let className;

      if (!completeCount) {
        className = "list-started";
      } else if (completeCount < tasks.length) {
        className = "list-inprogress";
      } else {
        className = "list-done";
      }

      return <span className={className}>({completeCount}/{tasks.length})</span>
    } else {
      return null;
    }
  }

  /**
   * Affiche toutes les todo-lists existantes, ou un message d'erreur s'il n'y en a aucune
   */
  renderLists = () => {
    const { lists } = this.props;
    
    if (!lists.length) {
      return (
        <p className="noResult">Vous n'avez pas encore créé de todo-list.</p>
      );
    }

		return lists.map(list => {
      return (
        <li key={list._id} className="clickable" onClick={() => this.props.history.push(`list/${list._id}`)}>
          {list.title} {this.renderListProgress(list)}
        </li>
      )
		});
  };
  
  render() {
    const Lists = this.props.loading ? <Loader config={{type: 'spinner'}} /> : <ul>{this.renderLists()}</ul>;

    return (
      <div className="container">
        <header>
          <h2>Vos Todo-lists</h2>
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input
              type="text"
              ref="textInput"
              placeholder="Créer une nouvelle todo-list"
            />
          </form>          
        </header>
        {Lists}      
      </div>
    );
  }
}

HomePage.propTypes = {
  list: PropTypes.object,
  loading: PropTypes.bool,
  handleList: PropTypes.object,
};