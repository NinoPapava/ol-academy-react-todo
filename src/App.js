import React from 'react';
import { TodoWrapper } from './components/TodosUsingHooks/TodoWrapper';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoWrapper />
      </div>
    );
  }
}

export {App};
