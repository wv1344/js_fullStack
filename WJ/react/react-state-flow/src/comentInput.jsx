import React,{Component} from 'react';

class comentInput extends Component {
 
  render(){
    const { comentList } = this.props;
    return (
      <div>
        {
          comentList.map((list,i) => {
            return (
             <div key={i}>{list.userName}----{list.comentContent}</div>
            )
          })
        }
      </div>
    )
  }
}

export default comentInput