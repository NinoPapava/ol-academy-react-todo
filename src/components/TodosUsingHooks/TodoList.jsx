import React from 'react';

const TodoList = ({ todoItems }) => {

  return (
    <div className="todo-list">
      {todoItems.map((item) => (
        <li className='list-item' key={item.id} style={{ textDecoration: item.isDone ? 'line-through' : 'none', color: item.isDone ? 'red' : 'black' }}>
          {item.editMode ? (
            <>
              <input type='text' value={item.name} className='list' onChange={(e) => "handleEditInputChange"(e, item)} />
            </>
          ) : (
            <>
              {item.name}
            </>
          )}
        </li>
      )
      )}
    </div>
  );
}
export { TodoList };
