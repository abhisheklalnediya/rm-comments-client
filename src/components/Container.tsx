import React, { Component } from 'react'
import { NewComment } from './NewComment';
import { Comments } from './Comments';
import './styles.scss'
import { CommentConsumer, UserConsumer } from '../context';
import { Login } from './Login'

export class Container extends Component {
  render() {
    return (
      <div className="container">
        <UserConsumer>
          {
            user => (
              !user.showLoginPage ? <CommentConsumer>
                {
                  data => (
                    <React.Fragment>
                      <NewComment onNewComment={data.newComment} />
                      {!user.user && <a className="loginLink" onClick={() => user.showLogin!()}>Login</a>}
                      <Comments comments={data.comments || []} />
                    </React.Fragment>
                  )
                }
              </CommentConsumer> : <Login onSignUp={user.signUp} onLogin={user.login} />
            )
          }
        </UserConsumer>
      </div>
    )
  }
}
