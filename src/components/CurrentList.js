import React, { useState } from 'react';

const CurrentList = (props) => {
  // Declare a new state variable, which we'll call "count"  
  const [list, setList] = useState(
    [...props.existingList]
  );
  const [newItem, setNewItem] = useState('')

  const handleRemove = (e) => {
    let remove = e.target.parentNode.getAttribute('data-item')
  
    var filtered = list.filter((el) => { return el.name !== remove }); 
      setList([ 
        ...filtered
      ]);
    }

  const handleAdd = () => {
    setList([
        ...list,
        { name: newItem }
      ]);
  }

  const listItems = list.map(({name}) =>  
      <li key={name} data-item={name}><span>{name}</span><button onClick={(handleRemove)}>x</button></li>
  );




  return (
    <>
    <input placeholder="add new item" value={newItem} onChange={e => setNewItem(e.target.value)} />
    <button onClick={handleAdd}>Add</button>

    <ul>
    {listItems}
    </ul>
    </>
  );
}

export default CurrentList