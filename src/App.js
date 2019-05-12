import React, { Component } from 'react';
import Board from './Board';

export default class App extends Component {
  constructor(props) {
    super(props);
    let width = 45;
    this.state = {
      width: width,
      height: Math.round(width / 1.8),
      board: this.createBoard(width)
    };
  }

  createBoard(startingWidth) {
    let board = [];
    for (let i = 0; i < startingWidth; i++) {
      board.push(new Array(Math.round(startingWidth / 1.4)).fill(false));
    }
    return board;
  }

  colorCell(coords) {
    let board = this.state.board;
    board[coords.x][coords.y] = !board[coords.x][coords.y];
    this.setState({ board: board });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center my-3">
          <div className="col-12">
            <h1 className="display-4">Conway's Game of Life</h1>
          </div>
        </div>

        <div className="board mx-1 text-center">
          <Board
            canvasClick={this.colorCell.bind(this)}
            board={this.state.board}
            width={this.state.width}
            height={this.state.height} />
        </div>
      </div>
    );
  }
}
