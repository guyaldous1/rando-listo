import './App.css';
import CurrentList from './components/CurrentList.js';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomItem, setRandomItem] = useState('')

  const [lists, setLists] = useState(null);
  const [currentList, setCurrentList] = useState(null)

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
        postsData = JSON.parse(postsData)
        setLists(postsData);
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
      
      const response = await fetch(
        `/api/get-list?listId=${currentList.id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      let postsData = await response.json();
      postsData = JSON.parse(postsData)
      setData(postsData);
      console.log(postsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  fetchCurrentListData()
}, [currentList]);

  const handleNew = async (newItem) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      const response = await fetch(
        `/api/update-list?listId=${currentList}&newItem=${newItem}`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      let postsData = await response.json();
      postsData = JSON.parse(postsData)
      setData([...postsData]);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleRemove = async (removeItem) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      const response = await fetch(
        `/api/update-list?listId=${currentList}&removeItem=${removeItem}`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      let postsData = await response.json();
      postsData = JSON.parse(postsData)
      setData([...postsData]);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleReset = async () => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
      const response = await fetch(
        `/api/update-list?listId=${currentList}&reset`, settings
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      
      let postsData = await response.json();
      postsData = JSON.parse(postsData)
      setData([...postsData]);
      // console.log(postsData, data);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };
  
  const randomise = () => {
    if(data.length <= 0) return

    const random = Math.floor(Math.random() * data.length)
    const randomItem = data[random]
    console.log(random, randomItem)
    setRandomItem(randomItem.name)
  }

  return (
    <div className="App">
  {lists && 
      lists.map(({name, id}, index) =>  {
        return <li key={id} onClick={() => setCurrentList({id, name})}><span>{name}</span></li>
  })} 
    {loading && (
        <div className="text-xl font-medium">Loading list...</div>
      )}
    {error && <div className="text-red-700">{error}</div>}
    {randomItem &&
    <p>{randomItem}</p>
    }
    
    {data && 
    <>
      <h2>Current List: {currentList.name}</h2>
      <button onClick={() => randomise()}>randomise</button>
      <CurrentList existingList={data} handleNew={handleNew} handleRemove={handleRemove} />
      <button onClick={() => handleReset()}>reset list</button>
    </>
    } 
    </div>
  );
}

export default App;
