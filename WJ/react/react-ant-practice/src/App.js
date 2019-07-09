import React,{Component} from 'react';
import logo from './logo.svg';
import {Button,Icon} from 'antd'
import TouchAble from './TouchButton'
import './App.css';
import 'antd/dist/antd.css'

const size ='large'
class App extends Component{
  constructor(props){
    super(props);
    this.functionRef = null;
    this.objectRef = React.createRef();
  }
  state ={}
  componentDidMount(){
    // 组件 挂载到页面
    // 通过原生 js 操作 dom
    this.refs.srtRef.innerHTML = 'String ref;'
    this.functionRef.innerHTML = 'FunctionRef'
    this.objectRef.current.innerHTML = 'Object ref'
    // this.functionRef.addEventListener('click',()=> {
    //   console.log('functionRef clicked')
    // })
  }
  render(){
    return(
      <div>
        <div>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button type="link">Link</Button>
          <br />
          <Button type="primary" size={size}>
            Primary
          </Button>
          <Button size={size}>Normal</Button>
          <Button type="dashed" size={size}>
            Dashed
          </Button>
          <Button type="danger" size={size}>
            Danger
          </Button>
          <Button type="link" size={size}>
            Link
          </Button>
          <br />
          <Button type="primary" shape="circle" icon="download" size={size} />
          <Button type="primary" shape="round" icon="download" size={size}>
            Download
          </Button>
          <Button type="primary" icon="download" size={size}>
            Download
          </Button>
          <br />
          <Button.Group size={size}>
            <Button type="primary">
              <Icon type="left" />
              Backward
            </Button>
            <Button type="primary">
              Forward
              <Icon type="right" />
            </Button>
          </Button.Group>

        </div>
        <div>
          <TouchAble>狗阿米</TouchAble>
        </div>
        <h1 ref="srtRef"></h1>
        <h1 ref={(node) => {
          this.functionRef = node;
        }}></h1>
        <h1 ref={this.objectRef}></h1>
        <input type="text" ></input>
      </div>
    )
  }
}

export default App;
