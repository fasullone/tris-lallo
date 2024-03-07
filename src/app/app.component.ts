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
  showReset: boolean = false;
  isPlaying: boolean = false;
  currentPlayer: number = 1;
  gamingTable: Cell[] = [];

  ngOnInit() {
    this.buildGameArea();
  }

  play() {
    this.showText = false;
    this.showReset = true;
    this.isPlaying = true;
  }

  reset() {
    this.showText = true;
    this.showReset = false;
    this.isPlaying = false;
    this.buildGameArea();
  }

  someoneWon() {
    alert("ha vinto player: ");
    this.reset();
  }

  isFinishedGame() {
    const filtered = this.gamingTable.filter(x => !x.isClicked);
    if (filtered.length === 0) {
      console.log("il gioco è finito");
      this.reset();
    }
    else {
      console.log("puoi continuare");
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
    this.gamingTable.forEach(cell => {
      if (cell.player === 1 && cell.isClicked) {
        player1Moves.push(cell.index);
        console.log("player 1 moves ", player1Moves);
      }
      if (cell.player === 2 && cell.isClicked) {
        player2Moves.push(cell.index);
        console.log("player 2 moves ", player2Moves);
      }
 
      if(win1.every(n => player1Moves.includes(n)) || win2.every(n => player1Moves.includes(n)) ||
      win3.every(n => player1Moves.includes(n)) || win4.every(n => player1Moves.includes(n)) ||
      win5.every(n => player1Moves.includes(n)) || win6.every(n => player1Moves.includes(n)) ||
      win7.every(n => player1Moves.includes(n)) || win8.every(n => player1Moves.includes(n))) {
        this.reset();
        console.log('hai vinto');
      }
 
      if(win1.every(n => player2Moves.includes(n)) || win2.every(n => player2Moves.includes(n)) ||
      win3.every(n => player2Moves.includes(n)) || win4.every(n => player2Moves.includes(n)) ||
      win5.every(n => player2Moves.includes(n)) || win6.every(n => player2Moves.includes(n)) ||
      win7.every(n => player2Moves.includes(n)) || win8.every(n => player2Moves.includes(n))) {
        this.reset();
        console.log('hai vinto');
      }
    });
  }

  makeMove(cell: Cell) {

    cell.isClicked = true;
    cell.player = this.currentPlayer;
    this.checkWinner();
    this.currentPlayer = cell.player === 1 ? 2 : 1;
    cell.image = this.currentPlayer === 1 ? "assets/lallo.jpg" : "assets/fasullo.jpg";
    console.log("ho cliccato:", cell);
    console.log("il prossimo turno è di player:", this.currentPlayer);
    this.isFinishedGame();
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
      // console.log(this.gamingTable);
    }
  }
}
