import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './list'
import ComentList from './comentInput'
import ComentInput from './comentList'

let geneId = 1;
class App extends Component {
  state ={
    lists:[
      {name:'tom',age:'10',school:'school1',id:0},
      {name:'tom2',age:'10',school:'school2',id:1},
    ],
    comentList:[
      
    ]
  }
  handleAddInfo = () =>{
    const lists = this.state.lists.slice(0);
    geneId++;
    lists.push({name:'tom2',age:'10',school:'school2',id:geneId})
    this.setState({lists})
  }
  handleListDelete = (id) => {
    console.log('父组件收到id：'+id)
    const lists = this.state.lists.slice(0);
    const index = lists.findIndex(list => list.id ===id);
    lists.splice(index,1)
    this.setState({
      lists
    })
  }
  handlePublish = (userName,comentContent) => {
    const comentList = this.state.comentList.slice(0);
    // console.log('jdlsf'+userName)
    comentList.push({
      userName,comentContent
    })
    this.setState({
      comentList
    })
    
  }
  render(){
    const { lists } = this.state;
    return (
      <React.Fragment>
        <ul>
          <button onClick={this.handleAddInfo}>点击</button>
          {
            lists.map((list,i) => {
              return (
                <List key={list.id} list={list} onDelete={this.handleListDelete}/>  
              )
            })
          }
        </ul>
        <div>
          <ComentInput onPublish={this.handlePublish}></ComentInput>
          <ComentList comentList={this.state.comentList}></ComentList>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
