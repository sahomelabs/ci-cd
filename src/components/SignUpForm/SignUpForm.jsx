import React, { Component } from "react";
import { signUp } from '../../utilities/users-service';
import "./SignUpForm.module.css";


export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
    signUpSuccess: false, // Track sign up success
  };


  handleChange = (evt) => {
    const {name, value } = evt.target;
    let error = "";

    if (name === "password") {
      // Check password requirements 
      if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
        error = "Password must contain at least one number and on special character";
      } else if (value.length < 8 || value.length > 15) {
        error = "Password must be between 8 and 15 characters long";
      }
      
    } else if (name === "confirm") {
          //Check if password and confirmation match
          if (value !== this.state.password) {
            error = "Password do not match";
          }
        

  } else if (name === "email") {
    // Check email format
    if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    }
  }


    this.setState({
      [name]: value,
      error: error
    });
  };

  //   this.setState({
  //     [evt.target.name]: evt.target.value,
  //     error: ''
  //   });
  // };


  handleSubmit = async (evt) => {
    evt.preventDefault();
    if (this.state.error || this.state.password !== this.state.confirm) {
      // If there are errors in the form or passwords don't match, prevent sign-up
      return;
    }
    
    try {
        const formData = {...this.state};
        delete formData.error;
        delete formData.confirm;
        const user = await signUp(formData);
        console.log(user)
        this.setState({ signUpSuccess: true }); // Set sign up success state



    } catch (error) {

      if (error.response && error.response.status === 409) {
        //Handle username or email already exists
        this.setState ({
          error: "Username or email already exists. Please choose another one or sign in."
        }); 
      } else {
    
        this.setState({
            error: "Sign Up Failed - Try Again"
        })
      }
    }
  };

  render() {

    // const { password, confirm, signUpSuccess, error } = this.state;
    // const disable = this.state.password !== this.state.confirm;
    const disable = this.state.error || this.state.password !== this.state.confirm || !/(?=.*\d)(?=.*[!@#$%^&*])/.test(this.state.password) || this.state.password.length < 8 || this.state.password.length > 15;


    return (
      <>
        {/* <div>SignUp</div> */}
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit} style={{margin:"1em"}}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        {this.state.signUpSuccess && (
          <p className="success-message">Sign Up Successful. Click Log In</p>
        )}
        <p className="error-message">{this.state.error}</p>
        
      </>
    );
  }
}
