import React from 'react';
import { whoAmI, signUp, login, onAuthFail } from './user.actions';
import { User } from './user.contracts'

export interface ContextProps {
  user: User,
  showLoginPage: boolean;
  signUp: Function,
  login: Function,
  showLogin: Function,
}

const UserContext = React.createContext<Partial<ContextProps>>({});

export interface Props {
}

export interface State {
  user?: User,
  showLoginPage: boolean
}


class UserProvider extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {
      user: undefined,
      showLoginPage: false,
    }
    this.signUp = this.signUp.bind(this)
    this.login = this.login.bind(this)
    this.whoAmI = this.whoAmI.bind(this)
    this.showLogin = this.showLogin.bind(this)
  }
  componentDidMount() {
    this.whoAmI().finally(() => {
      onAuthFail(() => {
        this.setState({ showLoginPage: true })
      })
    })
  }

  whoAmI() {
    return whoAmI().then((user: User) => {
      this.setState({ user, showLoginPage: false })
    })
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  signUp(d: User) {
    return new Promise((resolve, reject) => {
      signUp(d).then(x => {
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }

  login(d: User) {
    return new Promise((resolve, reject) => {
      login(d).then((t) => {
        console.log(t)
        this.saveToken(t.token)
        this.whoAmI()
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }
  showLogin() {
    this.setState({ showLoginPage: true })
  }
  render() {
    console.log(this.state)
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          signUp: this.signUp,
          login: this.login,
          showLogin: this.showLogin,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };