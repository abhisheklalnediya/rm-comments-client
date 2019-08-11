import React from 'react';
import { getComments, newComment, editComment } from './comment.actions';
import { Comment } from './comment.contracts'

export interface ContextProps {

  comments: Comment[],
  newComment: Function,
  editComment: Function
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
    return new Promise((resolve, reject) => editComment(comment).then(x => {
      console.log(x)
      if (x) {
        this.setState(state => ({
          comments: [...state.comments, x]
        }))
      }
      resolve()
    }).catch((e: any) => {
      reject(e)
    }))
  }
  render() {
    console.log(this.state)
    return (
      <CommentContext.Provider
        value={{
          ...this.state,
          newComment: this.newComment,
          editComment: this.editComment
        }}
      >
        {this.props.children}
      </CommentContext.Provider>
    );
  }
}
const CommentConsumer = CommentContext.Consumer;

export { CommentProvider, CommentConsumer };