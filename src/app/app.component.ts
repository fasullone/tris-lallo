import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cell } from './cell';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'tris-lallo';
  showText: boolean = true;
  isPlaying: boolean = false;
  currentPlayer: number = 1;
  whichImages: number = 1;
  player1Score: number = 0;
  player2Score: number = 0;
  roundsNumber: number = 0;
  player1Name: string = "Player1";
  player2Name: string = "Player2";
  gamingTable: Cell[] = [];

  ngOnInit() {
    this.buildGameArea();
  }

  play() {
    this.showText = false;
    this.isPlaying = true;
  }

  resetMatch() {
    this.showText = true;
    this.isPlaying = false;
    this.currentPlayer = 1;
    this.roundsNumber = 0;
    this.resetScore();
    this.buildGameArea();
  }

  resetRound(){
    this.currentPlayer = 1;
    this.buildGameArea();
  }

  resetScore() {
    this.player1Score = 0;
    this.player2Score = 0;
    this.roundsNumber = 0;
  } 

  isFinishedGame() {
    const filtered = this.gamingTable.filter(x => !x.isClicked);
    if (filtered.length === 0) {
      alert("PAREGGIO!")
      this.resetRound();
      this.roundsNumber++;
    }
  }

  checkWinner() {
    const win1 = [0, 1, 2];
    const win2 = [3, 4, 5];
    const win3 = [6, 7, 8];
    const win4 = [0, 3, 6];
    const win5 = [1, 4, 7];
    const win6 = [2, 5, 8];
    const win7 = [0, 4, 8];
    const win8 = [2, 4, 6];
    const player1Moves: number[] = [];
    const player2Moves: number[] = [];
    let player1HasWon = false;
    let player2HasWon = false;

    this.gamingTable.forEach(cell => {
      if (cell.player === 1 && cell.isClicked) {
        player1Moves.push(cell.index);
      }
      if (cell.player === 2 && cell.isClicked) {
        player2Moves.push(cell.index);
      }

      if (win1.every(n => player1Moves.includes(n)) || win2.every(n => player1Moves.includes(n)) ||
        win3.every(n => player1Moves.includes(n)) || win4.every(n => player1Moves.includes(n)) ||
        win5.every(n => player1Moves.includes(n)) || win6.every(n => player1Moves.includes(n)) ||
        win7.every(n => player1Moves.includes(n)) || win8.every(n => player1Moves.includes(n))) {
        player1HasWon = true;
        this.resetRound();
      }

      if (win1.every(n => player2Moves.includes(n)) || win2.every(n => player2Moves.includes(n)) ||
        win3.every(n => player2Moves.includes(n)) || win4.every(n => player2Moves.includes(n)) ||
        win5.every(n => player2Moves.includes(n)) || win6.every(n => player2Moves.includes(n)) ||
        win7.every(n => player2Moves.includes(n)) || win8.every(n => player2Moves.includes(n))) {
        player2HasWon = true;
        this.resetRound();
      }
    });

    if (player1HasWon || player2HasWon) {
      if (player1HasWon) {
        this.player1Score++;
        this.roundsNumber++;
      }
      if (player2HasWon) {
        this.player2Score++;
        this.roundsNumber++;
      }
      alert(` ${player1HasWon ? this.player1Name : this.player2Name} ha vinto!`);
    }
  }

  makeMove(cell: Cell) {
    cell.isClicked = true;
    cell.player = this.currentPlayer;
    if (this.whichImages === 1) {
      cell.image = this.currentPlayer === 1 ? "assets/x-removebg-preview.png" : "assets/o-removebg-preview.png";
    }
    else {
      cell.image = this.currentPlayer === 1 ? "assets/fasullo.jpg" : "assets/lallo.jpg";
    }
    this.currentPlayer = cell.player === 1 ? 2 : 1;
    setTimeout(() => {
      this.checkWinner();
      this.isFinishedGame();
    }, 250);
  }

  buildGameArea() {
    this.gamingTable = [];
    for (let i = 0; i <= 8; i++) {
      const cell: Cell = {
        index: i,
        player: null,
        isClicked: false,
        image: ""
      };
      this.gamingTable.push(cell);
    }
  }
}
