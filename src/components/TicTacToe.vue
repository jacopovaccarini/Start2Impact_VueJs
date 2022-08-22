<template>
  <div class="tictactoe-board">
    <div class="title-text">
      Tic Tac Toe
    </div>

    <div class="type-text">
      {{ playerX }} VS {{ playerO }}
    </div>

    <div v-for="(n, i) in 3">
      <div v-for="(n, j) in 3">
        <cell @click="performMove(i, j)" :value="board.cells[i][j]"></cell>
      </div>
    </div>

    <div class="round-text" v-if="play == true">
      {{ gameRound }}
    </div>

    <div @click="reset()" class="reset-button" v-if="firstCell == false">
      RIAVVIA
    </div>

    <router-link to="/">
      <div class="home-button">
        <a>HOME</a>
      </div>
    </router-link>

  </div>
</template>

<script>
import Board from '../Board'

export default {

  created () {
    this.showPlayerMessage('giocatore X')
  },

  data () {
    return {
      gameOver: false,
      gameOverText: '',
      gamePlayer: Math.round(Math.random()), // 0=X, 1=O
      gameType: this.$route.params.type,
      gameRound: '',
      playerX: '',
      playerO: '',
      firstCell: true,
      play: false,
      board: new Board()
    }
  },

  methods: {
    performMove (x, y) {
      if (this.gameType === 'Giocatore') {
        // Modalità VS Computer
        if (this.gamePlayer === 0) {
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
            this.showResultMessage()
            return
          }

          this.gamePlayer = 1

          this.gameRound = `Tocca a ${this.playerO}`

          this.$forceUpdate()

          setTimeout(() => this.performMove(), 1000)
        } else if (this.gamePlayer === 1) {
          let aiMove = this.minimax(this.board.clone(), 'o')
          this.board.doMove(aiMove.move.x, aiMove.move.y, 'o')

          if (this.board.isGameOver()) {
            this.gameOver = true
            this.gameOverText = this.board.playerHas3InARow('o') ? 'Hai perso!' : 'Pari'
            this.showResultMessage()
          }

          this.gamePlayer = 0

          this.gameRound = `Tocca a ${this.playerX}`

          this.$forceUpdate()
        }
      } else if (this.gameType === 'Giocatori') {
        // Modalità con due giocatori
        if (this.gamePlayer === 0) {
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
            this.gameOverText = this.board.playerHas3InARow('x') ? `Ha vinto ${this.playerX}!` : 'Pari'
            this.showResultMessage()
            return
          }

          this.gamePlayer = 1

          this.gameRound = `Tocca a ${this.playerO}`

          this.$forceUpdate()
        } else if (this.gamePlayer === 1) {
          if (this.gameOver) {
            return
          }

          if (!this.board.doMove(x, y, 'o')) {
            // Invalid move.
            return
          }

          this.$forceUpdate()

          if (this.board.isGameOver()) {
            this.gameOver = true
            this.gameOverText = this.board.playerHas3InARow('o') ? `Ha vinto ${this.playerO}!` : 'Pari'
            this.showResultMessage()
          }

          this.gamePlayer = 0

          this.gameRound = `Tocca a ${this.playerX}`

          this.$forceUpdate()
        }
      }

      if (this.firstCell) {
        this.firstCell = false
      }
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
    },

    showResultMessage () {
      this.$swal({
        title: this.gameOverText,
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: 'RIAVVIA',
        denyButtonText: 'HOME',
        confirmButtonColor: '#0f871f',
        denyButtonColor: '#0f871f'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reset()
        }
        if (result.isDenied) {
          this.$router.push('/')
        }
        if (result.isDismissed) {
          window.location.reload()
        }
      })
    },

    showPlayerMessage (typePlayer) {
      this.$swal({
        title: `Nome ${typePlayer}?`,
        input: 'text',
        inputLabel: 'Scrivi il tuo nome',
        showCancelButton: false,
        confirmButtonColor: '#22b14c',
        inputValidator: (value) => {
          if (!value) {
            return 'Devi inserire un nome!'
          } else {
            if (this.playerX === '') {
              this.playerX = value
              if (this.gameType === 'Giocatore') {
                this.playerO = 'Computer'
              } else if (this.gameType === 'Giocatori') {
                this.showPlayerMessage('giocatore O')
              }
            } else if (this.playerO === '') {
              this.playerO = value
            }
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.gamePlayer === 0) {
            this.gameRound = `Tocca a ${this.playerX}`
          } else if (this.gamePlayer === 1) {
            this.gameRound = `Tocca a ${this.playerO}`
            setTimeout(() => this.performMove(), 1000)
          }
          this.play = true
        }
        if (result.isDismissed) {
          if (this.gameType === 'Giocatore') {
            this.playerX = 'Giocatore'
            this.playerO = 'Computer'
          } else if (this.gameType === 'Giocatori') {
            this.playerX = 'Giocatore1'
            this.playerO = 'Giocatore2'
          }
          if (this.gamePlayer === 0) {
            this.gameRound = `Tocca a ${this.playerX}`
          } else if (this.gamePlayer === 1) {
            this.gameRound = `Tocca a ${this.playerO}`
            setTimeout(() => this.performMove(), 1000)
          }
          this.play = true
        }
      })
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 372px;
    height: 100%;
  }

  .title-text {
    display: flex;
    justify-content: center;
    margin: auto;
    font-size: 60px;
    width: 100%;
  }

  .type-text {
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 1rem;
    font-size: 20px;
    width: 100%;
  }

  .round-text {
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 1rem;
    font-size: 20px;
    width: 90%;
    border: 1px solid white;
    border-radius: 10px;
  }

  .reset-button {
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin: auto;
    margin-top: 1.5rem;
    padding: 0.5rem;
    width: 40%;
    border: 1px solid white;
    border-radius: 10px;
    background-color: darkgreen;
    cursor: pointer;
  }

  .router-link-active {
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin: auto;
    margin-top: 1.5rem;
    padding: 0.5rem;
    width: 40%;
    border: 1px solid white;
    border-radius: 10px;
    background-color: darkgreen;
  }

  .home-button {
    color: white;
    text-decoration: none;
  }

  .reset-button:not([disabled]):hover,
  .reset-button:not([disabled]):focus,
  .router-link-active:not([disabled]):hover,
  .router-link-active:not([disabled]):focus {
    box-shadow: inset 0 2px 25px #0006;
  }

  .reset-button:not([disabled]):active,
  .router-link-active:not([disabled]):active {
    box-shadow: inset 0 2px 50px #0008;
  }
</style>
