import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import React from 'react';
import Input from './components/Input';
import Table from './components/Table';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar />
        <Input />
      </div>
    );
  }
}

export default App;

