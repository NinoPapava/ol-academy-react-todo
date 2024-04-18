import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import './Todo.css';

class TodoWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      errorMessage: ''
    };
  }

  handleAddTask = (taskName) => {
    const { tasks } = this.state;
    if (taskName.trim() !== '') {
      const existingTask = tasks.filter(task => task.name === taskName);
      if (existingTask.length > 0) {
        this.setState({ errorMessage: 'A task with this name already exists.' });
      } else {
        this.setState({ tasks: [...tasks, { name: taskName, isDone: false, isToggle: false }], errorMessage: '' });
      }
    } else {
      this.setState({ errorMessage: 'Task name cannot be empty.' });
    }
  }

  handleTaskMarked = (taskName) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map(task => (
      task.name === taskName ? { ...task, isDone: !task.isDone } : task
    ));
    this.setState({ tasks: updatedTasks });
  }

  handleTaskChecked = (taskName) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map(task => (
      task.name === taskName ? { ...task, isChecked: !task.isChecked } : task
    ));
    this.setState({ tasks: updatedTasks });
  }


  handleDeleteTask = (taskName) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter(task => task.name !== taskName);
    this.setState({ tasks: updatedTasks });
  }

  handleEditTask = (oldTaskName, newTaskName) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map(task =>
      task.name === oldTaskName ? { ...task, name: newTaskName } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  handleMoveTask = (updatedTasks) => {
    this.setState({ tasks: updatedTasks, errorMessage: '' });
  };


  render() {
    const { tasks, errorMessage } = this.state;
    return (
      <div className="todo-wrapper">
        <h1>Ol Academy Todo List</h1>
        <AddTodo onAddTask={this.handleAddTask} tasks={tasks} />
        <TodoList
          tasks={tasks}
          errorMessage={errorMessage}
          onDeleteTask={this.handleDeleteTask}
          onTaskMarked={this.handleTaskMarked}
          onTaskChecked={this.handleTaskChecked}
          onEditTask={this.handleEditTask}
          onMoveTask={this.handleMoveTask}
        />
        <button onClick={() => this.setState({ tasks: tasks.filter(task => !task.isDone) })}>Delete Marked Tasks</button>
        <button onClick={() => this.setState({ tasks: tasks.filter(task => !task.isChecked) })}>Delete Checked Tasks</button>
        <button onClick={() => this.setState({ tasks: [] })}>Delete All Tasks</button>
      </div>
    );
  }
}

export { TodoWrapper };