import React, { Component } from 'react';
import Board from './Board';

export default class App extends Component {
  constructor(props) {
    super(props);
    let width = 45;
    this.state = {
      width: width,
      height: Math.round(width / 1.8),
      board: this.createBoard(width),
      simIntervalId: null
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

  startSimulation(speedFactor) {
    let intervalId = setInterval(this.simulationCycle, 1000 * speedFactor);
    this.setState({ simIntervalId : intervalId });
  }

  simulationCycle() {
    let { board } = this.state;
    const { width, height } = this.state;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let neighborCount = this.getCellNeighborCount(x, y);
        if (board[x][y]) {
          board[x][y] = !(neighborCount < 2 || neighborCount > 3);
        } else {
          board[x][y] = neighborCount === 3;
        }
      }
    }
    this.setState({ board: board });
  }

  getCellNeighborCount(currCellX, currCellY) {
    const { board, width, height } = this.state;
    let neighborCount = 0;

    for (let x = currCellX - 1; x <= x + 1; x++) {
      for (let y = currCellY - 1; y <= y + 1; y++) {
        const withinXBounds = x >= 0 && x <= width;
        const withinYBounds = y >= 0 && y <= height;
        if (withinXBounds && withinYBounds) {
          neighborCount = board[x][y] ? neighborCount + 1 : neighborCount;
        }
      }
    }
    return neighborCount;
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
