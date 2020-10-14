import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  
  class Board extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        messages: [],
        value: '',
        user: true,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.switchUser = this.switchUser(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
 
    render() {
      return (
        <div>
          <div>
                {this.state.messages.map(function(message) {
                      return <div key={message} className = {this.state.user ? 'user1' : 'user2'}>{message}</div>
                 }, this)}                
          </div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="message" value={this.state.value} onChange={this.handleChange}>
              </input>
              <input type="submit" value="send" ></input>
          </form>
          <button name="Switch user" onClick={this.switchUser}>Switch user</button>

        </div>
      );
    }

    handleSubmit(event) {   
      var joined = this.state.messages.concat(this.state.value);
      event.preventDefault();
      this.setState({messages: joined})
      console.log(this.state.messages);
    }

    switchUser(){
      this.setState({user: !this.state.user});
      console.log(this.state.user);
    }
  }
  
  /*class Game extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
              }],
              stepNumber: 0,
              xIsNext: true,
          };
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ===0,
        });
    }
    
    render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Revenir au tour n°' + move :
            'Revenir au début de la partie';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}
        </button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = winner + ' a gagné';
    } else {
        status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');
    }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }*/
  
  // ========================================
  
  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
  