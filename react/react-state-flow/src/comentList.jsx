import React,{Component} from 'react';

class comentList extends Component {

  
  handlePublish = () => {
    const { onPublish } = this.props;
    const userName = this.refs.userName.value;
    const comentContent = this.refs.comentContent.value;
    console.log({userName,comentContent})
    // console.log(onPublish)
    onPublish(userName,comentContent)
  }
  render(){
    return (
      <div>
        user:<input type = "text" ref="userName"></input><br></br>
        content:<textarea name="" ref="comentContent" id="" cols="30"></textarea>
        <button onClick={this.handlePublish}>发布</button>
      </div>
    )
  }
}

export default comentList