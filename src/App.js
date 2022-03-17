import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Results from './components/Results'
import Graph from './components/Graph';
import About from './components/pages/About';

const App = () => {
  const [results, setResults] = useState({})

  //add the values
  const addResult = (result) => {
    setResults(result)
  }

  return (
    <>
      <Header />
      <div className="container">
        <Form onCalculate={addResult}/>
      </div>
      <div className="container results-graph">
        <Graph graph = {results} />
      </div>
      <div className="container results-container">
        <Results results={results}/>
      </div>
    </>
  );
}

export default App;
