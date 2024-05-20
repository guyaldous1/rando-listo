import './App.css';
import CurrentList from './components/CurrentList.js';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentListData = async () => {
      try {
        
        const response = await fetch(
          `/api/get-list`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        
        let postsData = await response.json();
        postsData = JSON.parse(postsData)
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentListData();
  }, []);

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
        `/api/update-list?newItem=${newItem}`, settings
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
        `/api/update-list?removeItem=${removeItem}`, settings
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
        `/api/update-list?reset`, settings
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
  
  return (
    <div className="App">
          {loading && (
      <div className="text-xl font-medium">Loading list...</div>
    )}
    {error && <div className="text-red-700">{error}</div>}
    {data &&
    <>
      <CurrentList existingList={data} handleNew={handleNew} handleRemove={handleRemove} />
      <button onClick={() => handleReset()}>reset list</button>
    </>
    } 
    </div>
  );
}

export default App;
