import React, { Component } from 'react';
/**
 * 第一次挂载时候：
 * 更新：
 */
class Index extends Component {
  state = {
    count: 0
  }
  handleCountAdd = () => {
    let { count } = this.state;
    count ++;
    this.setState({
      count
    })
  }
  // 挂载
  componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillReceiveProps(prevProps, nextProps) {
    console.log('componentWillReceiveProps');
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() { 
    const { parentCount } = this.props
    return (
      <div>
        <h1>parentCount:{parentCount}</h1>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleCountAdd}>
          handleCountAdd
        </button>
      </div>
    );
  }
}
 
export default Index;