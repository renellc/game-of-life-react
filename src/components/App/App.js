import React, { Component } from 'react';
import Board from '../Board/Board';
import BoardControl from '../BoardControl/BoardControl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.width = 45;
    this.heightRatio = 1.8;
    this.height = Math.floor(this.width / this.heightRatio);
    this.state = {
      board: this.createBoard(),
      simIntervalId: null,
      simRunning: false
    };
  }

  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.width; i++) {
      board.push(new Array(Math.floor(this.height)).fill(false));
    }
    return board;
  }

  startSimulation = () => {
    let intervalId = window.setInterval(() => {
      const newBoard = this.simulateGeneration();
      this.setState({ board: newBoard });
    }, 1000);
    this.setState({ simIntervalId: intervalId, simRunning: true });
  }

  simulateGeneration = () => {
    let { board } = this.state;
    let newBoard = this.createBoard();

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let neighborCount = this.getCellNeighborCount(x, y);
        let doesLivingCellDie = !(neighborCount < 2 || neighborCount > 3);
        let doesDeadCellLive = neighborCount === 3;
        newBoard[x][y] = board[x][y] ? doesLivingCellDie : doesDeadCellLive;
      }
    }
    return newBoard;
  }

  getCellNeighborCount = (currCellX, currCellY) => {
    const { board } = this.state;
    let neighborCount = 0;

    for (let x = currCellX - 1; x <= currCellX + 1; x++) {
      for (let y = currCellY - 1; y <= currCellY + 1; y++) {
        if (x === currCellX && y === currCellY) {
          continue;
        }
        const withinXBounds = x >= 0 && x < this.width;
        const withinYBounds = y >= 0 && y < this.height;
        const cellLiving = withinXBounds && withinYBounds && board[x][y];
        neighborCount = cellLiving ? neighborCount + 1 : neighborCount;
      }
    }
    return neighborCount;
  }

  colorCell = (coords) => {
    let { simRunning } = this.state;
    if (simRunning) {
      return;
    }

    let board = this.state.board;
    board[coords.x][coords.y] = !board[coords.x][coords.y];
    this.setState({ board: board });
  }

  stopSimulation = () => {
    const { simIntervalId } = this.state;
    window.clearInterval(simIntervalId);
    this.setState({ simRunning: false });
  }

  clearBoard = () => {
    this.stopSimulation();
    const board = this.createBoard();
    this.setState({ board });
  }

  render = () => {
    return (
      <div className="container-fluid">
        <div className="row text-center my-3">
          <div className="col-12">
            <h1 className="display-4">Conway's Game of Life</h1>
          </div>
        </div>

        <div className="board mx-1">
          <Board
            canvasClick={this.colorCell}
            board={this.state.board}
            width={this.width}
            height={this.height} />

          <BoardControl 
            start={this.startSimulation}
            stop={this.stopSimulation}
            clear={this.clearBoard} />
        </div>
      </div>
    );
  }
}
