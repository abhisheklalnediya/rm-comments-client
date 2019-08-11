import React, { Component } from 'react'

interface Props {
  onNewComment?: Function
}
interface State {
  comment: string
}

export class NewComment extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      comment: ""
    }
    this.onNewComment = this.onNewComment.bind(this)
    this.onCommentChange = this.onCommentChange.bind(this)
  }
  onNewComment() {
    const { onNewComment } = this.props
    const { comment } = this.state

    onNewComment!({
      comment
    }).then((x: any) => {
      this.setState({ comment: "" })
    })
  }
  onCommentChange(e: any) {
    this.setState({
      comment: e.target.value
    })

  }
  render() {
    const { comment } = this.state
    return (
      <div className="new-comment">
        <textarea className="input" placeholder="Write your comment here" maxLength={200} onChange={this.onCommentChange} value={comment} />
        <button disabled={!comment} className="submit-btn btn" onClick={this.onNewComment}>Submit</button>
      </div>
    )
  }
}
