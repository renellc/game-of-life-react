import React, { Component } from 'react';
import Board from './Board';
import './App.css'

export default class App extends Component {
  state = {
    width: 50,
    height: 50,
    board: this.createBoard()
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 50; i++) {
      board.push(new Array(50).fill(false));
    }
    return board;
  }

  colorCell(x, y) {
    let board = this.state.board;
    board[x][y] = !board[x][y];
    this.setState({
      board: board
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center my-3">
          <div className="col-12">
            <h1 className="display-4">Conway's Game of Life</h1>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <Board canvasClick={this.colorCell.bind(this)}board={this.state.board} width={this.state.width} height={this.state.height} />
          </div>
        </div>
      </div>
    );
  }
}
