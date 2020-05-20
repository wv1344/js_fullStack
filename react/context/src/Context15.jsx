import React, { Component } from 'react'; 
import propTypes from 'prop-types'

class Context15 extends Component {
  // static
  // foo () {}
  // foo = () => {}
  state = { 
    theme:'red'
  }
  //  后代组件从这里拿信息
  getChildContext(){
    return{  
      theme:this.state.theme
    }
  }
  // handleToggleTheme = (e)=>{
  //   const theme = e.target.dataset.theme;
  //   this.setState({
  //     theme
  //   })
  // }

  // handleToggleTheme = (theme) => ()=> {
  //   this.setState({
  //     theme
  //   })
  // }

  handleToggleTheme = (theme) => {
    this.setState({
      theme
    })
  }
  render() { 
    const msg = ['str1','str2','str3']
    
    return ( 
      <div>
        {
          msg.map((item,i) => {
            return (
              <div>
                <Message key={i} text={item}/>
              </div>
            )
          })
        }
        <button onClick={()=>{
          this.handleToggleTheme('purple')
        }} data-theme="purple">purple</button>

        <button onClick={()=>{
          this.handleToggleTheme('yellowgreen')
        }}data-theme="yellowgreen">yellowgreen</button>
      </div>
    );
  }
}

/**
 *  function Person() {}
 *  Person.childContextType ={}
 */
Context15.childContextTypes = {
  theme:propTypes.string
}

class Message extends Component{
  shouldComponentUpdate() {
    return false
  }
  render(){
  const { text } = this.props
    return (
      <li>
        {text}
        <MyButton></MyButton>
      </li>
    )
  }
}

class MyButton extends Component{
  static contextTypes = {
    theme:propTypes.string
  }
  render(){
    const { theme } = this.context
    return (
      <button style={{color:theme}}>delete</button>
    )
  }
}
 
export default Context15;