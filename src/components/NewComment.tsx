import React, { Component } from 'react'

export class NewComment extends Component {
  render() {
    return (
      <div className="new-comment">
        <textarea className="input" placeholder="Write your comment here" maxLength={200} />
        <button className="submit-btn btn">Submit</button>
      </div>
    )
  }
}
