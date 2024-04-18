import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editIndex: -1,
      newTaskName: '',
      taskIndexes: [],
      errorMessage: ''
    };
  }


  handleChange = (e, index) => {
    const { taskIndexes } = this.state;
    const updatedTaskIndexes = [...taskIndexes];
    updatedTaskIndexes[index] = e.target.value;
    this.setState({ taskIndexes: updatedTaskIndexes });
  };

  handleEditTask = (index, taskName) => {
    this.setState({ editIndex: index, newTaskName: taskName, errorMessage: '' });
  };
  handleMoveUp = (index) => {
    const { tasks } = this.props;
    this.setState({ errorMessage: '' }); // Clear error message
    if (index > 0) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index - 1];
      updatedTasks[index - 1] = temp;
      this.props.onMoveTask(updatedTasks);
    }
  };

  handleMoveDown = (index) => {
    const { tasks } = this.props;
    this.setState({ errorMessage: '' }); // Clear error message
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index + 1];
      updatedTasks[index + 1] = temp;
      this.props.onMoveTask(updatedTasks);
    }
  };

  handleCancelEdit = () => {
    this.setState({ editIndex: -1, newTaskName: '', errorMessage: '' });
  };

  handleSaveTask = () => {
    const { editIndex, newTaskName } = this.state;
    const { tasks } = this.props;
    this.props.onEditTask(tasks[editIndex].name, newTaskName);
    this.setState({ editIndex: -1, newTaskName: '', errorMessage: '' });
  };


  render() {
    const { tasks, onDeleteTask, onTaskMarked, onTaskChecked } = this.props;
    const { editIndex, newTaskName, errorMessage } = this.state;
    return (
      <div className="todo-list">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ul>
          {tasks.map((task, index) => (
            <li key={task.name} style={{ textDecoration: task.isDone ? 'line-through' : 'none', color: task.isDone ? 'red' : 'black' }}>
              {editIndex === index ? (
                <>
                  <input type="text" value={newTaskName} onChange={(e) => this.setState({ newTaskName: e.target.value })} />
                  <button onClick={this.handleSaveTask}>Save</button>
                  <button onClick={this.handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <input type='checkbox' onClick={() => onTaskChecked(task.name)} />
                  {task.name}
                  <button onClick={() => onTaskMarked(task.name)}>Done</button>
                  <button onClick={() => this.handleEditTask(index, task.name)}>Edit</button>
                  <button onClick={() => onDeleteTask(task.name)}>Delete</button>
                  <button onClick={() => this.handleMoveUp(index)}>Up</button>
                  <button onClick={() => this.handleMoveDown(index)}>Down</button>
                </>
              )}
            </li>
          ))}

        </ul>
      </div>
    );
  }
}

export { TodoList };