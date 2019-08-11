import React, { Component } from 'react'
import classnames from 'classnames';

export class CommentItem extends Component {
  render() {
    return (
      <div className="comment-item">
        <div className="comment-top">
          <div className="comment-username">user name</div>
          <div className="comment-time">12:22</div>
          <div className="comment">Avengers Assemble</div>
        </div>
        <div className="comment-bottom">
          <div className={classnames('comment-replies-actions', { 'has-replies': this.props.children && true })}>
            <div className="comment-actions">
              <button>Edit</button>
              <button>Reply</button>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
