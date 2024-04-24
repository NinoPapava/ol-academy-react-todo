import React from 'react';

const TodoList = ({ todoItems, setTodoItems, errorMessage, setErrorMessage }) => {

  const handleToggleComplete = (id) => {
    setErrorMessage("");
    let updatedTodoItems = todoItems.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setTodoItems(updatedTodoItems);
  }

  const handleItemChecked = (id) => {
    setErrorMessage("");
    setTodoItems(todoItems.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ));
  }

  const handleDelete = ({ id }) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  }

  return (
    <div className="todo-list">
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {todoItems.map((item) => (
        <li className='list-item' key={item.id} style={{ textDecoration: item.isDone ? 'line-through' : 'none', color: item.isDone ? 'red' : 'black' }}>
          {item.editMode ? (
            <>
              <input type='text' value={item.name} className='list' onChange={(e) => "handleEditInputChange"(e, item)} />
            </>
          ) : (
            <>
            <input type='checkbox' checked={item.isChecked} onChange={() => handleItemChecked(item.id)} />
              {item.name}
              <button className='button-isComplete' onClick={() => handleToggleComplete(item.id)}>Complete</button>
              <button className='button-edit' onClick={() => handleDelete(item)}>Delete</button>
            </>
          )}
        </li>
      )
      )}
    </div>
  );
}
export { TodoList };
