import React from 'react';
import { connect } from 'react-redux'


class Count extends React.Component{
  state = {}
  handleIn(){
    this.props.increment();
  //   store.dispatch({type:'INCREMENT'})
  }
  handleDe(){
    this.props.decrement();
  //   store.dispatch({type:'DECREMENT'})
  }
  handleAddFilm(){
    this.props.addFilm();
  //   store.dispatch({
  //     type:'ADD_FILM',
  //     film:{name:'狮子王'}
  //   })
  }
  render(){
    console.log(this.props)
    const { count,films } = this.props
    return (
      <div>
        count:{count}
        
        <button onClick={this.handleIn.bind(this)}>+</button>
        <button onClick={this.handleDe.bind(this)}>-</button>
        <button onClick={this.handleAddFilm.bind(this)}>add film</button>
        {films.map((film,i) => {
          return (
            <li key={i}>
              {film.name}
            </li>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count:state.count,
    films:state.films
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    foo:()=> {console.log('foo')},
    increment:()=>{dispatch({type:'INCREMENT'})},
    decrement:()=>{dispatch({type:'DEINCREMENT'})},
    addFilm:()=> {
    dispatch({
      type:'ADD_FILM',
      film:{name:'123'}
    })
  }
 }
}
export default connect(mapStateToProps,mapDispatchProps)(Count);
