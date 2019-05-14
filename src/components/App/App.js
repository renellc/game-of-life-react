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
      simRunning: false,
      simIntervalId: null,
      simSpeedFactor: 1
    };
  }

  /**
   * Creates an empty board using the width and height properties of this class.
   *
   * @memberof App
   * @returns {Array<Array<Boolean>>} A new board (filled with false boolean values).
   */
  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.width; i++) {
      board.push(new Array(Math.floor(this.height)).fill(false));
    }
    return board;
  }

  /**
   * Begins the Game of Life simulation.
   *
   * @memberof App
   */
  startSimulation = () => {
    const { simSpeedFactor } = this.state;
    const simSpeed = 750 / simSpeedFactor;
    let intervalId = window.setInterval(() => {
      const newBoard = this.simulateGeneration();
      this.setState({ board: newBoard });
    }, simSpeed);
    this.setState({ simIntervalId: intervalId, simRunning: true });
  }

  /**
   * Simulates how the cells evolve for one generation.
   *
   * @memberof App
   * @returns {Array<Array<Boolean>>} A new board (filled with false boolean values).
   */
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

  /**
   * Gets the total number of living cells that neighbor a specified cell.
   * 
   * @memberof App
   * @param {Number} currCellX The x coordinate value for the cell.
   * @param {Number} currCellY The y coordinate value for the cell.
   * @returns {Number} The number of living cells that neighbor the specified cell.
   */
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

  /**
   * Sets a specified cell's living state to the opposite of what it currently is in.
   *
   * @memberof App
   * @param {Object} coords The cell coordinate values.
   * @param {Number} coords.x The X coordinate value for the cell.
   * @param {Number} coords.Y The Y coordinate value for the cell.
   */
  colorCell = (coords) => {
    let { simRunning } = this.state;
    if (simRunning) {
      return;
    }

    let board = this.state.board;
    board[coords.x][coords.y] = !board[coords.x][coords.y];
    this.setState({ board: board });
  }

  /**
   * Stops the simulation that is currently running.
   *
   * @memberof App
   */
  stopSimulation = () => {
    const { simIntervalId } = this.state;
    window.clearInterval(simIntervalId);
    this.setState({ simRunning: false });
  }

  /**
   * Clears the board of any living cells.
   *
   * @memberof App
   */
  clearBoard = () => {
    this.stopSimulation();
    const board = this.createBoard();
    this.setState({ board });
  }

  /**
   * Changes the speed factor value (the value that affects how fast the simulation runs).
   *
   * @memberof App
   * @param {Object} ev The event generated from an HTML element.
   */
  changeSpeedFactor = (ev) => {
    const { simRunning } = this.state;
    this.setState({ simSpeedFactor: ev.target.value }, () => {
      if (simRunning) {
        this.stopSimulation();
        this.startSimulation();
      }
    });
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
            speedControl={this.changeSpeedFactor}
            start={this.startSimulation}
            stop={this.stopSimulation}
            clear={this.clearBoard} />
        </div>
      </div>
    );
  }
}
