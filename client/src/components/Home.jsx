import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: '',
    };
  }
  componentDidMount() {
    fetch('http://localhost:5000/home', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userDetails: data.data });
      });
  }
  render() {
    return (
      <div
        name="home"
        className="w-full h-screen flex justify-center items-center"
      >
        <div className=" fixed  box-border h-32 w-1/2 p-4 rounded-md bg-slate-100 shadow-md text-gray-600 truncate">
          Email{' '}
          <span className="text-bold text-lg text-pink-400">
            {this.state.userDetails.email}
          </span>
          <br />
          Password:
          <span className="text-bold text-lg text-pink-400">
            {this.state.userDetails.password}
          </span>
        </div>
      </div>
    );
  }
}

export default Home;
