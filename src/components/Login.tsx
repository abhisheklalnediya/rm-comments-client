import React, { Component } from 'react'

interface Props {
  onSignUp?: Function
  onLogin?: Function
}

interface State {
  email: string;
  name: string;
  password: string;
  error: string;
  lEmail: string;
  lPassword: string;
  lError: string;

}
const initialState = {
  email: "",
  name: "",
  password: "",
  error: "",
  lEmail: "",
  lPassword: "",
  lError: "",
}

export class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = initialState
    this.onChange = this.onChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
  }
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const state: any = {}
    state[name] = value
    this.setState(state)
  }
  onSignUp(e: React.FormEvent) {
    e.preventDefault()
    const { name, email, password } = this.state
    this.props.onSignUp!({
      name, email, password
    }).then(() => {
      this.setState({
        ...initialState,
        lEmail: email, lPassword: password
      }, () => {
        this.onLogin()
      })
    }).catch((e: any) => {
      console.log(e)
      this.setState({ error: e.message || "Signup  Failed!!" })
    })
  }
  onLogin(e?: React.FormEvent) {
    if (e) { e.preventDefault() }
    const { lEmail, lPassword } = this.state
    this.setState({ lError: "" })
    this.props.onLogin!({ email: lEmail, password: lPassword }).then(() => { }).catch((e: any) => {
      this.setState({ lError: "Login Failed" })
      // console.log(e)
    })
  }
  render() {
    const { name, email, password, error, lEmail, lPassword, lError } = this.state
    console.log(this.state)
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.onSignUp}>
          <div>
            <label >Name</label>
            <input name="name" onChange={this.onChange} value={name} required />
          </div>
          <div>
            <label >Email</label>
            <input name="email" type="email" onChange={this.onChange} value={email} required />
          </div>
          <div>
            <label >Password</label>
            <input name="password" type="password" onChange={this.onChange} value={password} minLength={8} required />
          </div>
          <span className="error-msg">{error}</span>
          <div>
            <button >Sign Up</button>
          </div>
        </form>
        <h3>Login</h3>

        <form onSubmit={this.onLogin}>
          <div>
            <label >Email</label>
            <input name="lEmail" type="email" onChange={this.onChange} value={lEmail} />
          </div>
          <div>
            <label >Password</label>
            <input name="lPassword" type="password" onChange={this.onChange} value={lPassword} />
          </div>
          <span className="error-msg">{lError}</span>
          <div>
            <button >Login</button>
          </div>
        </form>
      </div>
    )
  }
}
