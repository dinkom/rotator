import React, { useState, useEffect, useRef } from 'react';
import AlbumSearch from './components/AlbumSearch';
import ItemsList from './components/ItemsList';
import { defaultListItems } from './data';
import logo from './logo.svg';
import './App.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  let [listItems, setListItems] = useState(defaultListItems);
  let [fetchedListItems, setFetchedListItems] = useState();

  useInterval(() => {
    let tempList = JSON.parse(JSON.stringify(listItems));
    const itemToLastPlace = tempList.shift();
    tempList.push(itemToLastPlace);

    if (fetchedListItems && fetchedListItems.length) {
      let tempFetchedList = JSON.parse(JSON.stringify(fetchedListItems));
      const firstListItem = tempFetchedList.shift();
      tempList[tempList.length - 1].value = firstListItem;
      setFetchedListItems(tempFetchedList);
    }

    setListItems(tempList);
  }, 1000);

  const updateListItems = (searchResults) => {
    if (!searchResults || !searchResults.resultCount) {
      setListItems(defaultListItems);
      setFetchedListItems();
      return;
    }

    const albumSet = new Set();
    searchResults.results.forEach(result => albumSet.add(result.collectionName));
    const albumArray = Array.from(albumSet);
    albumArray.sort();

    setFetchedListItems(albumArray.slice(0, 5));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          ALBUM R<img src={logo} className="App-logo" alt="O" />TATOR
        </h1>
      </header>
      <div className="content">
        <AlbumSearch updateListItems={updateListItems} />
        <ItemsList listItems={listItems} />
      </div>
    </div>
  );
}

export default App;
