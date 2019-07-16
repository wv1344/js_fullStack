import React, { Component } from 'react';
import PropTypes from 'prop-types'

const Loader = (props) => (
  <div>
    <img src="/images/ball.svg" alt="loading"></img>
    <h2>{props.message}</h2>
  </div>
)

Loader.propTypes = {
  message:PropTypes.string
}
 
export default Loader;