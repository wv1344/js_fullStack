import React, { Component } from 'react';

class list extends Component {
  handleDelete = (event) => {
    const {onDelete} = this.props;
    const id = parseInt(event.target.dataset.id);
    console.log(id)
    onDelete(id)
  }
  render() {
    const {list} = this.props;
    return (
      // <React.Fragment>
      <>
        <li>
          name:{list.name}
          age:{list.age}
          school:{list.school}
          id:{list.id}
        </li>
        <button data-id={list.id} onClick={this.handleDelete}>delete</button>
      </>
      // </React.Fragment>
    )
  }
}

export default list