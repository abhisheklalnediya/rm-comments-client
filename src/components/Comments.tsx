import React, { Component } from 'react'
import { CommentItem } from './CommentItem';

const comments = [
  { id: "1", },
  { id: "2" },
  { id: "3" },
  { id: "4", parent: "1" }
]

export class Comments extends Component {
  renderCommentItem(comment: any) {
    const { id } = comment
    console.log(comment)
    const replies = comments.filter(x => x.parent && x.parent === id)
    console.log(replies)
    return (
      <CommentItem key={id} {...comment} >
        {replies.length ? replies.map(r => this.renderCommentItem(r.id)) : null}
      </CommentItem>
    )
  }
  render() {
    const parentComments = comments.filter(c => !c.parent)
    return (
      <div className="comments-container">
        {
          parentComments.map(c => this.renderCommentItem(c))
        }
      </div>
    )
  }
}
