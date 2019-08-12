import React, { Component } from 'react'
import { CommentItem } from './CommentItem';
import { Comment, CommentConsumer, UserConsumer } from '../context'

interface Props {
  comments: Comment[]
}

export class Comments extends Component<Props> {
  renderCommentItem(comment: any) {
    const { id } = comment
    const { comments } = this.props;
    const replies = comments.filter(x => x.parent && x.parent === id)
    return (

      <UserConsumer>
        {u => (
          <CommentConsumer>
            {c => (
              <CommentItem key={id} {...comment} onShowLogin={u.showLogin} onEdit={c.editComment} onAddReply={c.addReply} user={u.user && u.user.name}>
                {replies.length ? replies.map(r => this.renderCommentItem(r)) : null}
              </CommentItem>
            )}
          </CommentConsumer>
        )}
      </UserConsumer>
    )
  }
  render() {
    const { comments } = this.props;
    console.log(comments)
    const parentComments = comments.filter(c => !c.parent)
    return (
      <div className="comments-container">
        {
          parentComments.map(c => this.renderCommentItem(c))
        }
        {!parentComments.length && <span className="empty-msg">No commnets yet.</span>}
      </div>
    )
  }
}
