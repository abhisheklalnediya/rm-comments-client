import React from 'react';
import { getComments, newComment, editComment } from './comment.actions';
import { Comment } from './comment.contracts'

export interface ContextProps {

  comments: Comment[],
  newComment: Function,
  editComment: Function,
  addReply: Function
}

const CommentContext = React.createContext<Partial<ContextProps>>({});

export interface Props {
}

export interface State {
  comments: Comment[]
}


class CommentProvider extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {
      comments: []
    }
    this.newComment = this.newComment.bind(this)
    this.addReply = this.addReply.bind(this)
    this.editComment = this.editComment.bind(this)
  }
  componentDidMount() {
    getComments().then((comments: Comment[]) => {
      this.setState({ comments })
    })
  }
  newComment(comment: Comment) {
    return new Promise((resolve, reject) => newComment(comment).then(x => {
      console.log(x)
      if (x) {
        this.setState(state => ({
          comments: [...state.comments, x]
        }))
      }
      resolve()
    }).catch((e) => {
      reject(e)
    }))
  }
  editComment(comment: Comment) {
    const fn = comment.id ? editComment : newComment
    return new Promise((resolve, reject) => fn(comment).then(x => {
      console.log(x)
      if (x) {
        this.setState(state => ({
          comments: [...state.comments].map(c => (c.id === comment.id ? x : c))
        }))
      }
      resolve()
    }).catch((e: any) => {
      reject(e)
    }))
  }
  addReply(id: string, owner: string) {
    const dummyComment: Comment = { comment: "", parent: id, owner }
    this.setState(state => ({
      comments: [...state.comments, dummyComment]
    }))
  }
  render() {
    console.log(this.state)
    return (
      <CommentContext.Provider
        value={{
          ...this.state,
          newComment: this.newComment,
          editComment: this.editComment,
          addReply: this.addReply
        }}
      >
        {this.props.children}
      </CommentContext.Provider>
    );
  }
}
const CommentConsumer = CommentContext.Consumer;

export { CommentProvider, CommentConsumer };