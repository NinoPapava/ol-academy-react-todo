import React from 'react';

class AddTodo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="add-todo"></div>
    );
  }
}

export { AddTodo };