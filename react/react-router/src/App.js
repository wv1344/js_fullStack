import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import PageLayout from './page/Layout'
import 'antd/dist/antd.css'
// hashRouter  #
// historyRouter 不带#
// BrowserRouter 实现方式是通过 h5 的 History 
// 刷新这个行为

function App() {
  return (
   <Router>
     <Route path="/" component={PageLayout}></Route>
   </Router>
  );
}

export default App;
