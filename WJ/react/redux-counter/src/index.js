import React from 'react';
import ReactDOM from 'react-dom';
import Count from './App'
import index from './reducer/index'
import { Provider } from 'react-redux'

import {createStore } from 'redux'

const store = createStore(index)

ReactDOM.render(<Provider store={store}><Count /></Provider>, document.getElementById('root'));


// store.subscribe(()=>{
//   ReactDOM.render(<Count />, document.getElementById('root'));
// })