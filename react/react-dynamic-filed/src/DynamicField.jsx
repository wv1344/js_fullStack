import React, { Component } from 'react';

let generateId = 0;
class DynamicField extends Component {
  state = { 
    data:[
      {name:'name1',age:16,id:0}
    ]
  }
  handleValChange = (key,value,id) => {
    // 不可变数据
    let data = this.state.data.slice(0);
    let index = data.findIndex((item) => item.id === id)
    data[index][key] = value;
    this.setState({
      data
    })
  }
  handleValDelete =(id)=> {
    let data = this.state.data.slice(0);
    let index = data.findIndex((item) => item.id === id)
    data.splice(index,1)
    this.setState({
      data
    })
  }
  handleAdd =() => {
    let data = this.state.data.slice(0);
    generateId++;
    data.push({
      name:'',age:0,id:generateId
    })
    this.setState({
      data
    })
  }
  render() { 
    const { data } = this.state;
    return ( 
      <>
        {data.map((fieldData,index) => {
          return (
            <Field key={fieldData.id} fieldData={fieldData} 
            onFieldValChange={this.handleValChange}
            onFieldDelete={this.handleValDelete}
            />
          )
        })}
        <br/>
        <button onClick={this.handleAdd}>添加</button>
        <br/>
        <button >提交</button>
      </>
    );
  }
}
 
class Field extends Component {
  state = {  }
  handleFieldChangeName = (e) => {
    const name = e.target.value
    const id = parseInt(e.target.dataset.id)
    const { onFieldValChange } = this.props;
    onFieldValChange('name',name,id)
  }
  handleFieldChangeAge = (e) => {
    
    const age = e.target.value
    const id = parseInt(e.target.dataset.id)
    const { onFieldValChange } = this.props;
    console.log(age)
    onFieldValChange('age',age,id)
  }
  handleDelete =(e) =>{
    const id = parseInt(e.target.dataset.id)
    const { onFieldDelete } = this.props;
    onFieldDelete(id)
  }
  render() { 
    const { fieldData } = this.props;
    const { name,age } = fieldData;
    return ( 
      <div>
        姓名：<input type="text" value={name} data-id={fieldData.id} 
        onChange={this.handleFieldChangeName}/>
        年龄：<input type="number" value={age} data-id={fieldData.id} 
        onChange={this.handleFieldChangeAge} />
        <button onClick={this.handleDelete} data-id={fieldData.id}>删除</button>
      </div>
    );
  }
}
 
export default DynamicField;