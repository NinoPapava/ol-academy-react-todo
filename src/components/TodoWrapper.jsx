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

  handleAddTask = (taskName) => {
    const { tasks } = this.state;
    if (taskName.trim() !== '') {
      const existingTask = tasks.filter(task => task.name === taskName);
      if (existingTask.length > 0) {
        this.setState({ errorMessage: 'A task with this name already exists.' });
      } else {
        this.setState({ tasks: [...tasks, { name: taskName, isDone: false }], errorMessage: '' });
      }
    } else {
      this.setState({ errorMessage: 'Task name cannot be empty.' });
    }
  }


  render() {
    const { tasks } = this.state;
    return (
      <div className="todo-wrapper">
        <h1>Ol Academy Todo List</h1>
        <AddTodo onAddTask={this.handleAddTask}  tasks={tasks}  />
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export { TodoWrapper };