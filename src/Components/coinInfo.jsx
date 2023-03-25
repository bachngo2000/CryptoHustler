import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

// Step 2: Create CoinInfo component so that coin prices and images can be queried and displayed
// Now at this step, we don't just want to show our list of coins, but also the prices of them and their logos. We will create a component so that we can access this 
// information dynamically for each coin that we parse.

// The three things we will pass in to this component are the image path, full name, and symbol of each coin, so this component needs to be able to read it in and 
// do stuff with it.
const CoinInfo = ({ image, name, symbol }) => {
    const [price, setPrice] = useState(null);

    // Still inside the CoinInfo component, we will use useEffect similarly to how we did in Step 1 except now, we are passing in {symbol} in the closing [] in useEffect(). 
    // This means that now instead of useEffect() running on every render, it will now run whenever the symbol we pass in changes or gets updated. So every time we give
    // a new coin symbol to get the info for, useEffect() will run.
    useEffect(() => {
        // we need to get the price data for one coin at a time, and will define an async function to call the API for this data.
        // Also, since we are passing in a symbol to our API call, you will need to add the reference to the symbol, ${symbol} in the link for the API call
        const getCoinPrice = async () => {
            const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` + API_KEY);
            const json = await response.json();
            setPrice(json);
          };
        
        // we want to make sure to call our fetchAllCoinData() method and handle any errors that could pop up with it
        getCoinPrice().catch(console.error);

    }, [symbol]);

    // Next we need to display our coinInfo properly so that it can be sent back to wherever our component is being called
    // Inside of this return statement is where we will add our list items for each coin and all of their info. From all of the fields that the 
    // API call to all coins gives us, we can extract the imageUrl, full name of the coin, and symbol for the coin (which we used to get the price
    // data). Now we want to display them all as a list item
    return (
        <div>
            {price ? ( // rendering only if API call actually returned us data
                <li className="main-list" key={symbol}>
                    <img
                    className="icons"
                    src={`https://www.cryptocompare.com${image}`}
                    alt={`Small icon for ${name} crypto coin`}
                    />
                    {name} <span className="tab"></span> ${price.USD} USD
                </li>
            ) : 
            null
            }
        </div>
    )
  
};
  
  export default CoinInfo;