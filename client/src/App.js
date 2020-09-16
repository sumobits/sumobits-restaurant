import React from 'react';
import RestaurantContainer from './components/Container';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Restaurants</p>
      </header>
      <RestaurantContainer />
    </div>
  );
}

export default App;
