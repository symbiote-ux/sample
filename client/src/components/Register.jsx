import React, { Component } from 'react';
import Cover from '../img/cover.jpg';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    fetch('http://localhost:5000/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert('User Registered');
          window.location.href = './login';
        }
        if (data.status === 400) {
          alert(data.error);
        }
      });
  }

  render() {
    return (
      <div
        name="register"
        className="w-full h-screen bg-[#e5e6ef] flex flex-wrap justify-center items-center"
      >
        <div className="container bg-[#f2f3f7] h-4/5 w-4/5 rounded-xl shadow-2xl md:w-3/6 md:h-4/6 lg:grid  lg:grid-rows-6 lg:grid-cols-2 lg:grid-flow-col lg:w-4/5 lg:h-4/5">
          <img
            src={Cover}
            alt="cover"
            className="rounded-t-xl h-2/5 w-full lg:h-full lg:row-span-6 lg:rounded-l-xl lg:rounded-r-none"
          />
          <div className="text-center mt-2">
            <p className="text-[#6b7280] font-semibold md:text-2xl lg:text-3xl">
              Sign Up <br />
              <span className="text-[#22d3ee]">to shoot up</span>
            </p>
          </div>
          <div className="sm:flex justify-center lg:row-span-4">
            <form
              action=""
              onSubmit={this.handleSubmit}
              className="items-left m-4 text-xl text-[#6b7280] md:text-3xl lg:text-4xl"
            >
              <label>
                Email address : <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="px-4 text-xl my-2 py-1 md:my-4 lg:text-3xl"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
              </label>{' '}
              <br />
              <label>
                Set password : <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="px-4 text-xl my-2 py-1 md:my-4 lg:text-3xl"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </label>
              <br />
              <div className="flex justify-center">
                <button className="text-[#64ffda] border-[#64ffda] group border-2 rounded-lg px-6 py-3 mt-2 flex items-center hover:bg-pink-600 hover:border-pink-600 hover:text-white md:mt-4">
                  Sign Up
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 20 20"
                      className="ml-3"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <p className="text-center mt-6 ml-4 lg:row-span-1">
            Already a member ?{' '}
            <span className="text-[#22d3ee] hover:text-pink-600 hover:cursor-pointer">
              <a href="/login"> Login here</a>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
