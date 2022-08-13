<template>
  <div class="tictactoe-board">
    <div class="title-text">
      {{ titleText }}
    </div>

    <div v-for="(n, i) in 3">
      <div v-for="(n, j) in 3">
        <cell @click="performMove(i, j)" :value="board.cells[i][j]"></cell>
      </div>
    </div>

    <div class="game-over-text" v-if="gameOver">
      {{ gameOverText }}
    </div>

    <div class="reset-button" v-if="gameOver">
      <button @click="reset()">Riavvia</button>
    </div>
  </div>
</template>

<script>
import Board from '../Board'

export default {

  data () {
    return {
      titleText: 'Tic Tac Toe',
      gameOver: false,
      gameOverText: '',
      board: new Board()
    }
  },

  methods: {
    performMove (x, y) {
      if (this.gameOver) {
        return
      }

      if (!this.board.doMove(x, y, 'x')) {
        // Invalid move.
        return
      }

      this.$forceUpdate()

      if (this.board.isGameOver()) {
        this.gameOver = true
        this.gameOverText = this.board.playerHas3InARow('x') ? 'Hai vinto!' : 'Pari'
        return
      }

      let aiMove = this.minimax(this.board.clone(), 'o')
      this.board.doMove(aiMove.move.x, aiMove.move.y, 'o')

      if (this.board.isGameOver()) {
        this.gameOver = true
        this.gameOverText = this.board.playerHas3InARow('o') ? 'Hai perso!' : 'Pari'
      }

      this.$forceUpdate()
    },

    minimax (board, player, depth = 1) {
      if (board.isGameOver()) {
        return {
          score: board.getScore() + depth,
          move: null
        }
      }

      let bestScore = player === 'o' ? -10000 : 10000
      let bestMove = null

      let moves = board.getPossibleMoves()
      for (let i = 0; i < moves.length; i++) {
        let move = moves[i]
        let newBoard = board.clone()
        newBoard.doMove(move.x, move.y, player)

        const score = this.minimax(newBoard, player === 'x' ? 'o' : 'x', depth + 1).score

        if ((player === 'o' && score > bestScore) || (player === 'x' && score < bestScore)) {
          bestScore = score
          bestMove = move
        }
      }

      return {
        score: bestScore,
        move: bestMove
      }
    },

    reset () {
      window.location.reload()
    }
  }
}
</script>

<style>
  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    width: 204px;
  }

  .title-text {
    display: flex;
    justify-content: center;
    margin: auto;
    padding-bottom: 3rem;
    font-size: 40px;
    width: 100%;
  }

  .game-over-text {
    display: flex;
    align-items: center;
    margin: auto;
    padding: 1rem;
  }

  .reset-button {
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 1rem;
    width: 100%;
  }

  .reset-button button {
    padding: 0.5rem;
    width: 50%;
  }
</style>
