import { useEffect, useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import CoinInfo from "./Components/coinInfo";



function App() {
  const [list, setList] = useState(null);
  
  // Step 1: Query the CryptoCompare API to get a list of all the coins
  // make our first API call and use that to display a list of crypto coins in our react app
  // use the useEffect() hook to call our API to guarantee that our API call is only used when the page renders, and allow the browser to display the screen even if all
  // the information isn't quite ready yet making for a better user experience.
  useEffect(() => {
    // define the async function that will call our API with fetch and then save it using the list and setList items that we defined for our state.
    const fetchAllCoinData = async () => {
      // API call to make a request to get the entire list of coins
      const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY);
      const json = await response.json();
      setList(json);
    };
    // we want to make sure to call our fetchAllCoinData() method and handle any errors that could pop up with it
    fetchAllCoinData().catch(console.error);
  }, []);

  // console.log(list.Data)

  // When it comes time to render our actual list of coins, using .map(), we first want to check that our API is not still waiting on results to fill up our list, and 
  // once we know list is not empty, we can display it.
  // Here we are using an if statement to filter down some of our coins so that we are only seeing blockchain coins. This makes our page a little more efficient
  return (
    <div className="whole-page">
      <h1> My Cryto Basket </h1>
      <ul>
        {list && Object.entries(list.Data).map(([coin]) =>
          list.Data[coin].PlatformType === "blockchain" ? (
          // <li key={list.Data[coin].FullName}>{list.Data[coin].FullName}</li>
          <CoinInfo
            image={list.Data[coin].ImageUrl}
            name={list.Data[coin].FullName}
            symbol={list.Data[coin].Symbol}
          />
          ) : null
        )}
      </ul>
    </div>
  )
}

export default App
