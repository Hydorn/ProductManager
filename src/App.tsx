import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Products from './components/Products';

type searchHandler = (param:string) => void;
function App() {

  const [search, setSearch] = useState("");

  const handleSearch:searchHandler = (param)=>{
    setSearch(param);
  }

  return (
    <div className="app">

      <Header 
        searchHandler={handleSearch}/>
      <div className='container'>
        <Products search={search}/>
      </div>
    </div>
  );
}

export default App;
