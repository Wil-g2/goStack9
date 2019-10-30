import React from 'react';
import {render} from 'react-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
      <>
        <Header />
        <PostList />
      </>
    )
}

export default App;
