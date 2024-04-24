
const AddTodo = ({ inputValue, setInputValue}) => {

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
    </div>
  );
}
export { AddTodo };


