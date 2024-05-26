import React, { useState, useEffect } from 'react';

const CurrentList = (props) => {

  const [list, setList] = useState(
    [...props.existingList]
  );
  const [newItem, setNewItem] = useState('')
  const [loading, setLoading] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault()

    if(newItem.length <= 0) return alert("please enter an item")

    props.handleNew(newItem)
    // setLoading(true)
  }

  const listStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    marginBottom: "5px",
    fontFamily: "Arial",
    textAlign: "left",
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center"
  };

  //update list on new item
  useEffect(() => { 
    setList([...props.existingList]) 
    setNewItem('')
    setLoading(false)
    
    alert([...props.existingList])

  }, [props.existingList]);

  let listItems = list.map(({name, id}, index) =>  {
      return <li key={id} style={listStyle}><span>{name}</span><button onClick={ () => props.handleRemove(id, name)}>x</button></li>
});



  return (
    <>
    <form onSubmit={handleAdd}>
      <fieldset disabled={loading}>
      <input placeholder="add new item" value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button type="submit">Add</button>
      </fieldset>
    </form>
    <ul style={{listStyleType: "none", padding: 0}}>
    {listItems}
    </ul>
    </>
  );
}

export default CurrentList