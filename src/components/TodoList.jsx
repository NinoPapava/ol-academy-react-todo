import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editIndex: -1,
      newTaskName: '',
      taskIndexes: [],
    };
  }

  render() {
    const { tasks } = this.props;
    const { editIndex, newTaskName } = this.state;
    return (
      <div className="todo-list">
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