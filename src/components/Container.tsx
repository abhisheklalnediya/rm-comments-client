import React, { Component } from 'react'
import { NewComment } from './NewComment';
import { Comments } from './Comments';
import './styles.scss'

export class Container extends Component {
  render() {
    return (
      <div className="container">
        <NewComment />
        <Comments />
      </div>
    )
  }
}
