import React from 'react';

class AddTodo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      taskName: '',
      errorMessage: ''
    };
  }

  
  handleClearError = () => {
    this.setState({ errorMessage: '' });
  };

  handleChange = (e) => {
    this.setState({ taskName: e.target.value });
  };

  handleSubmit = () => {
    const { taskName } = this.state;
    const { tasks } = this.props;
    if (taskName.trim() !== '') {
      const existingTask = tasks.filter(task => task.name === taskName);
      if (existingTask.length > 0) {
        this.setState({ errorMessage: 'A task with this name already exists.' });
      } else {
        this.props.onAddTask(taskName);
        this.setState({ taskName: '', errorMessage: '' });
      }
    } else {
      this.setState({ errorMessage: 'Task name cannot be empty.' });
    }
  };



  render () {
    const { taskName, errorMessage } = this.state;
    return (
      <div className="add-todo">
        <input
          type="text"
          value={taskName}
          onChange={this.handleChange}
          placeholder="Enter task name"
        />
        <button onClick={this.handleSubmit}>Add Task</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  }
}

export { AddTodo };