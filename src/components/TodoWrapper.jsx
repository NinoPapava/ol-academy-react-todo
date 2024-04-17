import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import './Todo.css';

class TodoWrapper extends Component {
  render() {
    return (
      <div className="todo-wrapper">
        <AddTodo />
        <TodoList />
      </div>
    );
  }
}

export { TodoWrapper };