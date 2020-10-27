import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  
  class Board extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        messages: [],
        messages2: [],
        value: '',
        user: true,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.switchUser = this.switchUser.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {  
      if(this.state.user) {
        var joined = this.state.messages.concat(this.state.value);
        event.preventDefault();
        this.setState({messages: joined})
      }
      else {
        var joined = this.state.messages2.concat(this.state.value);
      event.preventDefault();
      this.setState({messages2: joined})
      }
      this.setState({value: ''})
    }

    switchUser(){
      this.setState({user: !this.state.user});
      console.log(this.state.user);
    }
 
    render() {
      return (
        <div>
          <div>
                {this.state.messages.map(function(message) {
                      return <div key={message} className = "user1">{message}</div>
                 }, this)}                
          </div>
          <div>
                {this.state.messages2.map(function(message) {
                      return <div key={message} className = "user2">{message}</div>
                 }, this)}                
          </div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="message" value={this.state.value} onChange={this.handleChange}>
              </input>
              <input type="submit" value="send" ></input>
          </form>
          <button onClick={() => this.switchUser()}>Switch user</button>
        </div>
      );
    }
  }

  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
  