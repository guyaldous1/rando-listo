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
        // console.log('doot')
        const response = await fetch(
          `/api/get-list`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
        console.log(data)
      }
    };

    fetchCurrentListData();
  }, []);

  
  return (
    <div className="App">
          {loading && (
      <div className="text-xl font-medium">Loading list...</div>
    )}
    {error && <div className="text-red-700">{error}</div>}
    {/* {data &&
      <CurrentList existingList={data.list}/>
    } */}
    </div>
  );
}

export default App;
