import './App.css';
import CurrentList from './components/CurrentList.js';
import { useEffect, useState } from 'react';
import rcolor from 'rcolor';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomItem, setRandomItem] = useState('')

  const [lists, setLists] = useState(null);
  const [currentList, setCurrentList] = useState(null)
  const [loadingLists, setLoadingLists] = useState(true);
  const [loadingListData, setLoadingListData] = useState(false)

  //get all lists
  useEffect(() => {
    const fetchListOfLists = async () => {
      try {
        
        const response = await fetch(
          `/api/all-lists`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        
        let postsData = await response.json();
        setLists(postsData);
        setLoadingLists(false);
        setError(null);
        
      } catch (err) {
        setError(err.message);
        setLists(null);
      } finally {
        // setLoading(false);
      }
    };

    fetchListOfLists();
  }, []);

  //get current list
  useEffect(() => {
  const fetchCurrentListData = async () => {
    if(currentList !== null)
    try {
      setLoadingListData(true)
      const response = await fetch(
        `/api/get-list?listId=${currentList._id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      let postsData = await response.json();
      setData(postsData.list);
      // console.log(postsData);
      // setLoadingListData(false)
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoadingListData(false)
      setLoading(false);
    }
  };
  fetchCurrentListData()
}, [currentList]);

const reFetchListOfLists = async () => {
  try {
    
    const response = await fetch(
      `/api/all-lists`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    
    let postsData = await response.json();
    setLists(postsData);
    setLoadingLists(false);
    setError(null);
    
  } catch (err) {
    setError(err.message);
    setLists(null);
  } finally {
    // setLoading(false);
  }
};

  const handleNew = async (newItem) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      setLoading(true);
      const response = await fetch(
        `/api/update-list?listId=${currentList._id}&newItem=${newItem}`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      reFetchCurrentListData();
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleRemoveCall = async (removeItem) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      setLoading(true);
      const response = await fetch(
        `/api/update-list?listId=${currentList.id}&removeItem=${removeItem}`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      reFetchCurrentListData();
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const reFetchCurrentListData = async () => {
    if(currentList !== null)
    try {
      
      const response = await fetch(
        `/api/get-list?listId=${currentList._id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      let postsData = await response.json();
      setData(postsData.list);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      handleRemoveCall(id)
    } else {
      // Do nothing!
    }
  }

  const handleResetCall = async () => {

    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      setLoading(true);
      const response = await fetch(
        `/api/update-list?listId=${currentList.id}&reset`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      reFetchCurrentListData();
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleNewList = async (newItem) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      const response = await fetch(
        `/api/all-lists-update?newList=${newItem}`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      reFetchListOfLists()
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleAddList = () => {
    const enteredList = prompt('Please enter the name of the new list:')

    if (enteredList) {
      handleNewList(enteredList)
    }
  }
  
  const handleReset = () => {
    if (window.confirm(`Are you sure you want to reset ${currentList.name}?`)) {
      handleResetCall()
    } else {
      // Do nothing!
      // console.log('cancelled');
    }
  }
  
  const randomise = () => {
    if(data.length <= 0) return

    const random = Math.floor(Math.random() * data.length)
    const randomItem = data[random]
    console.log(random, randomItem)
    setRandomItem(randomItem.itemName)
  }

  return (
    <div className="App">

      <section className="container">
        <h3>Lists</h3>
        <div className={"list-name__wrapper " + (loadingListData ? "list-name__wrapper--disabled" : "")}>
        {loadingLists && (
        <div className="text-xl font-medium">Loading Lists....</div>
      )}
        {lists && 
            lists.map(({listName, _id}, index) =>  {
              return <div className="list-name" key={_id} onClick={() => setCurrentList({_id, listName})}><span>{listName}</span></div>
        })}
        <div className="list-name" onClick={handleAddList}>+ Add List +</div>
      </div>
    </section>
    
    <section className="container">
      {(loading && (data === null)) && (
          <div className="text-xl font-medium">Select a list.</div>
        )}
      {error && <div className="text-red-700">{error}</div>}
      
      {data && 
      <div className={"list-wrapper " + (loading ? "list-wrapper--disabled" : "")} >
        <h2>Current List: {currentList.listName}</h2>
        <button onClick={() => randomise()} disabled={data.length === 0}>randomise</button>
        {randomItem &&
          <p className='random-item' style={{ background: rcolor() }}>{randomItem}</p>
          }
        <CurrentList existingList={data} handleNew={handleNew} handleRemove={handleRemove} />
        <button onClick={() => handleReset()} disabled={data.length === 0}>reset list</button>
      </div>
      } 
    </section>
  </div>
  );
}

export default App;
