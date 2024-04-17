import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import './Todo.css';

class TodoWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }


  render() {
    const { tasks } = this.state;
    return (
      <div className="todo-wrapper">
        <h1>Ol Academy Todo List</h1>
        <AddTodo  tasks={tasks}  />
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export { TodoWrapper };