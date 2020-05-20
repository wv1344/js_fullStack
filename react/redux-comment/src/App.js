import React from 'react';
import { connect } from 'react-redux'
import App from './component/App.jsx'


// mapStateToProps
const a = (state) => {
  // 过滤一下
  return {
    commentList:state
  }
}
// mapDispatchToProps
const b = (dispatch) => {
  return{
    addComment:(userName,content) => {
      dispatch({
        type:'ADD_CONTENT',
        userName,
        content
      })
    }
  }
}
export default connect(a,b)(App);
