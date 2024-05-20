import React, { useState, useEffect } from 'react';

const CurrentList = (props) => {

  const [list, setList] = useState(
    [...props.existingList]
  );
  const [newItem, setNewItem] = useState('')
  const [loading, setLoading] = useState(false);

  console.log(loading)

  const handleAdd = (e) => {
    e.preventDefault()

    if(newItem.length <= 0) return alert("please enter an item")

    props.handleNew(newItem)
    setLoading(true)
  }

  //update list on new item
  useEffect(() => { 
    setList([...props.existingList]) 
    setNewItem('')
    setLoading(false)

  }, [props.existingList]);

  let listItems = list.map(({name, id}, index) =>  {
      return <li key={id}><span>{name}</span><button onClick={ () => props.handleRemove(id)}>x</button></li>
});


  return (
    <>
    <form onSubmit={handleAdd}>
      <fieldset disabled={loading}>
      <input placeholder="add new item" value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button type="submit">Add</button>
      </fieldset>
    </form>
    <ul>
    {listItems}
    </ul>
    </>
  );
}

export default CurrentList