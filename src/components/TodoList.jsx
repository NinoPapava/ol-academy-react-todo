import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskName: '',
      errorMessage: ''
    };
  }


  handleEditTask = (index, taskName) => {
    const { changeEditMode } = this.props
    this.setState({ newTaskName: taskName, errorMessage: '' });
    changeEditMode(index)
  }


  handleMoveUp = (index) => {
    const { tasks } = this.props;
    this.setState({ errorMessage: '' });
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
    this.setState({ errorMessage: '' });
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index + 1];
      updatedTasks[index + 1] = temp;
      this.props.onMoveTask(updatedTasks);
    }
  };

  handleCancelEdit = (index) => {
    const { changeEditMode } = this.props
    this.setState({ newTaskName: '', errorMessage: '' });
    changeEditMode(index)
  };

  handleSaveTask = (task) => {
    const { newTaskName } = this.state;
    this.props.onEditTask(task.name, newTaskName);
    this.setState({ newTaskName: '', errorMessage: '' });
  };


  render() {
    const { tasks, onDeleteTask, onTaskMarked, onTaskChecked } = this.props;
    const { newTaskName, errorMessage } = this.state;
    return (
      <div className="todo-list">
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ul>
          {tasks.map((task, index) => (
            <li key={task.name} style={{ textDecoration: task.isDone ? 'line-through' : 'none', color: task.isDone ? 'red' : 'black' }}>
              {task.editMode ? (
                <>
                  <input type="text" value={newTaskName} onChange={(e) => this.setState({ newTaskName: e.target.value })} />
                  <button onClick={() => this.handleSaveTask(task)}>Save</button>
                  <button onClick={() => this.handleCancelEdit(index)}>Cancel</button>
                </>
              ) : (
                <>
                  <input type='checkbox' checked={task.isToggle} onChange={() => onTaskChecked(task.name)} />
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