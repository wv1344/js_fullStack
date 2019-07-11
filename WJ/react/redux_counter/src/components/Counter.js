import React, { Component } from 'react';
import { connect } from 'react-redux'

class Counter extends Component {
  state = {  }
  render() { 
    return ( 
      <p>
        <h1>Clickd:{this.props.count} times</h1>
      </p>
    );
  }
}
// 1. map 共享状态
// 2. 作为参数给组件
const mapStateToProps = (state) => {
  // connect 找到这个参数，把state交给你
  return {
    count:state.count
  }
}
export default connect(mapStateToProps)(Counter);