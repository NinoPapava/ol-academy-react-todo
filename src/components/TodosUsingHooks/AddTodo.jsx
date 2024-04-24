import { v4 as uuidv4 } from 'uuid';


const AddTodo = ({ inputValue, setInputValue, todoItems, setTodoItems}) => {

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmitTodo = () => {

    if (inputValue.trim() === "") {
      // for err
    }
    const existingTask = todoItems.filter(item => item.name === inputValue);
    if (existingTask.length > 0) {
      //
    }
    setTodoItems([
      ...todoItems,
      { id: uuidv4(), name: inputValue, isChecked: false, editMode: false },
    ]);
    setInputValue("");
  }



  return (
    <div className='add-todo'>
      <input
        type='text'
        placeholder='Enter Item'
        className='item-input'
        value={inputValue}
        required
        onChange={handleInputChange}
      />
      <button onClick={handleSubmitTodo}>Add</button>
    </div>
  );
}
export { AddTodo };


