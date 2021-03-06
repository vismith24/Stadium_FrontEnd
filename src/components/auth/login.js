import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import pacman from '../../assets/pacman.gif'



const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(email: $username, password: $password) {
      token
    }
  }
`


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    const { username, password} = this.state
    return (
      <div className="container-fluid">
      {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
      <br></br><br></br>
      <div className="row">
        <div className="col-6">
          <img src={pacman} alt="" className="float-left " style={{"width":"inherit"}}/>
        </div>
        <div className="col-6">
          <div className="container" style={{"padding":"12%","fontFamily":"Josefin Sans"}}>
          <h3>Login</h3>
            <form className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                className="form-control"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
                type="email"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
              <br></br>
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                className="form-control"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
              />
            </form>
            <Mutation
                mutation={LOGIN_MUTATION}
                variables={{ username, password }}
                onCompleted={data => this._confirm(data)}
            >
                {login => (
                <button className="btn btn-primary" onClick={login}>
                    {'Login'}
                </button>
                )}

            </Mutation>
            <br></br>
            <div className="flex mt3">
            <br></br><br></br>
            
            <p>Dont have an accout? <Link to="/signup">Signup</Link> </p>
              <div>{data => {if (true) return <div>TEST</div>}}</div>
            
            </div>

        </div>
      </div>          
            
          </div>
        </div>
    )
  }

  _confirm = async data => {
    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;
    console.log('in confirm')
    if (!data) return(<div>Enter Valid credentials</div>)
    console.log(data.tokenAuth.token)
    const token = data.tokenAuth.token
    console.log(token)
    this._saveUserData(token)
    // Navbar._changeAuthState()
    this.props.history.push(`/`)
  }
  

  _saveUserData = token => {
    localStorage.setItem("token", token)
    console.log("Token: "+localStorage["token"])
    var aValue = localStorage.getItem("token");
    console.log("Token: "+aValue)
    this.props.location.aboutProps.update();
  }
}

export default Login
