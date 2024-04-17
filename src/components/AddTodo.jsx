import React from 'react';

class AddTodo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      taskName: ''
    };
  }

  handleChange = (e) => {
    this.setState({ taskName: e.target.value });
  };

  render () {
    const { taskName } = this.state;
    return (
      <div className="add-todo">
        <input
          type="text"
          value={taskName}
          onChange={this.handleChange}
          placeholder="Enter task name"
        />
      </div>
    );
  }
}

export { AddTodo };