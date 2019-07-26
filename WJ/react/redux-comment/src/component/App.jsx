import React, { Component } from 'react';

class App extends Component {
  componentDidMount(){
    const { addComment } = this.props
    setTimeout(() => {
      addComment('ALKJFDS','1111111')
      addComment('AKSJDF','sldkjfl;askdjfl;a')
    }, 2000);
  }
  render() { 
    const { commentList } = this.props;
    return ( 
      <div>
        {
          commentList.length === 0 ? '暂无' : <ul>
            {
              commentList.map((comment,i) => {
                return <li>
                  userName:{comment.userName}
                  content:{comment.content}
                </li>
              })
            }
          </ul>
        }
      </div>
     );
  }
}

export default App;