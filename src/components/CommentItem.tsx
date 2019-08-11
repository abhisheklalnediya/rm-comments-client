import React, { Component } from 'react'
import classnames from 'classnames';

export interface Props {
  children: React.ReactNode
  comment: string
  id: string
  parent: string
  time: string
  owner: string
  onEdit: Function
  user: string
}
export interface State {
  edit: boolean,
  newComment: string,
}
export class CommentItem extends Component<Props, State> {
  private inputRef = React.createRef<HTMLDivElement>();
  constructor(props: Props) {
    super(props)
    this.state = {
      edit: false,
      newComment: ""
    }
    this.onEdit = this.onEdit.bind(this)
    this.setNewComment = this.setNewComment.bind(this)
  }
  onEdit() {
    const { edit, newComment } = this.state
    const { id, onEdit } = this.props
    if (edit) {
      this.setState({ edit: false }, () => {
        onEdit({
          id, comment: newComment
        }).then(() => {
          this.setState({
            newComment: ""
          })
        })
      })
    } else {
      this.setState({ edit: true }, () => {
        this.inputRef.current!.focus()
      })
    }
  }
  setNewComment(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newComment: e.currentTarget.textContent || "" })
  }

  render() {
    const { edit } = this.state
    const { comment, time, owner, user } = this.props
    const fTime = (new Date(time)).toLocaleString()
    return (
      <div className="comment-item">
        <div className="comment-top">
          <div className="comment-username">{owner}</div>
          <div className="comment-time">{fTime}</div>
          <div className="comment" ref={this.inputRef} onInput={this.setNewComment} contentEditable={edit}>{comment}</div>
        </div>
        <div className="comment-bottom">
          <div className={classnames('comment-replies-actions', { 'has-replies': this.props.children && true })}>
            <div className="comment-actions">
              {user && user === owner && <button onClick={this.onEdit}>{edit ? 'Save' : 'Edit'}</button>}
              <button>Reply</button>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
