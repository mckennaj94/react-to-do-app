import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class ToDos extends Component{

  render() {
    return this.props.toDos.map((todo) => (
      <TodoItem 
      key={todo.id} 
      todo={todo} 
      markComplete={this.props.markComplete} 
      delToDo={this.props.delToDo}
      />
    ));
  }
}

// PropTypes
ToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delToDo: PropTypes.func.isRequired
}

export default ToDos;
