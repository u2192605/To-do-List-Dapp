import React from 'react';
import './App.css';
import { SideBar } from './Components/SideBar';
import { Main } from './Pages/Home';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Main/>
    </div>
  );
}

export default App;
