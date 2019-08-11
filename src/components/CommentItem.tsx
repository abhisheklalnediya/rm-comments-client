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
  onAddReply: Function
  onShowLogin: Function
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
      edit: !props.comment || false,
      newComment: props.comment
    }
    this.onEdit = this.onEdit.bind(this)
    this.setNewComment = this.setNewComment.bind(this)
    this.onAddReply = this.onAddReply.bind(this)
  }
  componentDidMount() {
    const { edit } = this.state
    if (edit) {
      this.inputRef.current!.focus()
    }
  }
  onEdit() {
    const { edit, newComment } = this.state
    const { id, onEdit, parent } = this.props
    if (edit) {
      this.setState({ edit: false }, () => {
        onEdit({
          id, comment: newComment, parent
        }).then(() => {
          // this.setState({
          //   newComment: ""
          // })
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
  onAddReply() {
    const { id, onAddReply, onShowLogin, user } = this.props
    if (user) {

      onAddReply(id, user)
    } else {
      onShowLogin()
    }
  }
  render() {
    const { edit, newComment } = this.state
    const { comment, time, owner, user, id } = this.props
    const fTime = time ? (new Date(time)).toLocaleString() : ''
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
              {user && user === owner && <button disabled={edit && newComment === comment} onClick={this.onEdit}>{edit ? 'Save' : 'Edit'}</button>}
              {id && <button onClick={this.onAddReply}>Reply</button>}
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
