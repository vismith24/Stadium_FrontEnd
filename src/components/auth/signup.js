import React, { Component } from 'react'
// import { AUTH_TOKEN } from './constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import Navbar from '../navigation/navbar';


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $email: String!, $password: String!, $DOB: Date!, $phoneNo: Int!, $gender: Int!) {
    createUser(username: $username, email: $email, password: $password, DOB: $DOB, phoneNo: $phoneNo, gender: $gender) {
      user{username},
    }
  }
`

class Signup extends Component {
  state = {
    username: '',
    email:'',
    password: '',
    DOB:"2000-01-01",
    phoneNo: 9870,
    gender: 1,
  }

  render() {
    const { username, email, password, DOB, phoneNo, gender} = this.state
    return (
      <div>
      {/*<Navbar /><br></br><br></br>   */}
      <div className="container col-sm-5 card border-primary">
        <br></br><h4>Signup</h4><br></br>

          <div className="form-group">
            <label htmlFor="exampleTextarea">Username</label>
            <br></br>
            <input
              className="form-group container"
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              type="text"
              placeholder="Username"
            />
            <br></br>
            <label htmlFor="exampleInputEmail1">Email</label>
            <br></br>
            <input
              className="form-group container"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <br></br>
            <label htmlFor="exampleInputPassword1">Password</label>
            <br></br>
            <input
              className="form-group container"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <br></br>
            <label htmlFor="exampleTextarea">Date of Birth</label>
            <br></br>
            <input
              className="form-group container"
              value={DOB}
              onChange={e => this.setState({ DOB: e.target.value })}
              type="date"
              placeholder="Date of Birth"
            />
            <br></br>
            <label htmlFor="exampleTextarea">Phone Number</label>
            <br></br>
            <input
              className="form-group container"
              value={phoneNo}
              onChange={e => this.setState({ phoneNo: e.target.value })}
              type="int"
              placeholder="phoneNo"
            />
            <br></br>
            <label htmlFor="exampleTextarea">Gender</label>
            <br></br>
            {/* <input
              className="form-group container"
              value={gender}
              onChange={e => this.setState({ gender: e.target.value })}
              type="int"
              placeholder="gender"
            /> */}
            <select className="form-control" id="exampleSelect1" onChange={e => this.setState({ gender: parseInt(e.target.value) })}>
              <option value='1' >Male</option>
              <option value='0'>Female</option>
              <option value='2'>Other</option>
            </select>
          </div>

          <div className="flex mt3">
          <Mutation
              mutation={SIGNUP_MUTATION}
              variables={{ username, email, password, DOB, phoneNo, gender }}
              onCompleted={data => this._confirm(data)}
          >
              {signup => (
              <button className="btn btn-primary" onClick={signup}>
                  {'Signup'}
              </button>
              )}

          </Mutation>
          
          <br></br><br></br>
          <p>Already have an accout? <Link to="/login">Login</Link></p>
          
          
          </div>
        </div>

      </div>
    )
  }

  _confirm = async data => {
    console.log(data)
    this.props.history.push(`/loggedin`)
  }
  
}

export default Signup
