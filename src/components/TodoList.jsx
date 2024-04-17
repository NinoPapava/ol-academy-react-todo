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



  render() {
    const { tasks } = this.props;
    const { editIndex, newTaskName, errorMessage } = this.state;
    return (
      <div className="todo-list">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ul>
          {tasks.map((task, index) => (
            <li key={task.name}>
              {editIndex === index ? (
                <>
                  <input type="text" value={newTaskName} onChange={(e) => this.setState({ newTaskName: e.target.value })} />
                </>
              ) : (
                <>
                  {task.name}
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