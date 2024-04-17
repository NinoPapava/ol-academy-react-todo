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


  render() {
    const { tasks, onDeleteTask, onTaskMarked } = this.props;
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
                </>
              ) : (
                <>
                  {task.name}
                  <button onClick={() => onTaskMarked(task.name)}>Mark as Done</button>
                  <button onClick={() => this.handleEditTask(index, task.name)}>Edit</button>
                  <button onClick={() => onDeleteTask(task.name)}>Delete</button>
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