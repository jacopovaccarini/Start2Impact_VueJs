<template>
  <div class="game-page">
    <div class="title-text">
      Tic Tac Toe
    </div>

    <div class="type-text" v-if="play == true">
      {{ gameScoreX }} - {{ playerX }} VS {{ playerO }} - {{ gameScoreO }}
    </div>

    <div class="game-board" v-for="(n, i) in 3">
      <div v-for="(n, j) in 3">
        <cell @click="performMove(i, j)" :value="board.cells[i][j]"></cell>
      </div>
    </div>

    <div class="round-text" v-if="play == true">
      {{ gameRound }}
    </div>

    <div class="menu-button">
      <div @click="reset()" class="reset-button" v-if="firstCell == true">
        RIAVVIA
      </div>

      <router-link to="/">
        <div class="home-button">
          <a>HOME</a>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Board from '../Board'

export default {

  created () {
    // Recupero dati dallo storage
    if (this.$session.exists('playerX')) {
      this.gameDifficulty = this.$session.get('gameDifficulty')
      this.playerX = this.$session.get('playerX')
      this.playerO = this.$session.get('playerO')
      this.gameScoreX = this.$session.get('gameScoreX')
      this.gameScoreO = this.$session.get('gameScoreO')
      // Scrittura turno e avvio gioco
      if (this.gameType === 'Giocatore') {
        if (this.gamePlayer === 0) {
          this.gameRound = `Tocca a ${this.playerX}`
        } else if (this.gamePlayer === 1) {
          this.gameRound = `Tocca a ${this.playerO}`
          setTimeout(() => this.performMove(), 1000)
        }
      } else if (this.gameType === 'Giocatori') {
        if (this.gamePlayer === 0) {
          this.gameRound = `Tocca a ${this.playerX}`
        } else if (this.gamePlayer === 1) {
          this.gameRound = `Tocca a ${this.playerO}`
        }
      }
      this.play = true
    } else {
      // Avvio messaggio scelta nome giocatore/i
      this.showPlayerMessage('giocatore X')
    }
  },

  data () {
    return {
      gameOver: false,
      gameOverText: '',
      gamePlayer: Math.round(Math.random()), // 0=X, 1=O
      gameType: this.$route.params.type,
      gameRound: '',
      gameDifficulty: 'D',
      gameScoreX: 0,
      gameScoreO: 0,
      gameColor: 'yellow',
      playerX: '',
      playerO: '',
      difficulty: 0,
      firstCell: false,
      play: false,
      board: new Board()
    }
  },

  methods: {
    // Funzione posizionamento X/O
    performMove (x, y) {
      // Modalità VS Computer
      if (this.gameType === 'Giocatore') {
        if (this.gamePlayer === 0) { // Giocatore X
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
            // Aumento punteggio giocatore X
            if (this.board.playerHas3InARow('x')) {
              this.gameScoreX++
            }
            // Avvio messaggio risultato partita
            this.showResultMessage()
            return
          }

          this.gamePlayer = 1

          this.gameRound = `Tocca a ${this.playerO}`

          this.$forceUpdate()

          setTimeout(() => this.performMove(), 1000)
        } else if (this.gamePlayer === 1) { // Giocatore O (Computer)
          // Verifica della difficoltà
          if (this.gameDifficulty === 'F') {
            this.difficulty = Math.round(Math.random()) // Tra 0 e 1
          } else if (this.gameDifficulty === 'D') {
            this.difficulty = 0
          }

          let aiMove = this.minimax(this.board.clone(), 'o')
          this.board.doMove(aiMove.move.x, aiMove.move.y, 'o')

          if (this.board.isGameOver()) {
            this.gameOver = true
            this.gameOverText = this.board.playerHas3InARow('o') ? 'Hai perso!' : 'Pari'
            if (this.board.playerHas3InARow('o')) {
              this.gameScoreO++
            }
            setTimeout(() => this.showResultMessage(), 1000)
          }

          this.gamePlayer = 0

          this.gameRound = `Tocca a ${this.playerX}`

          this.$forceUpdate()
        }
      } else if (this.gameType === 'Giocatori') { // Modalità con due giocatori
        if (this.gamePlayer === 0) { // Giocatore X
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
            if (this.board.playerHas3InARow('x')) {
              this.gameScoreX++
            }
            this.showResultMessage()
            return
          }

          this.gamePlayer = 1

          this.gameRound = `Tocca a ${this.playerO}`

          this.$forceUpdate()
        } else if (this.gamePlayer === 1) { // Giocatore O
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
            if (this.board.playerHas3InARow('o')) {
              this.gameScoreO++
            }
            this.showResultMessage()
          }

          this.gamePlayer = 0

          this.gameRound = `Tocca a ${this.playerX}`

          this.$forceUpdate()
        }
      }

      // Controllo prima cella per sblocco pulsante "Riavvia"
      if (!this.firstCell) {
        this.firstCell = true
      }
    },

    // Funzione controllo movimenti
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
      for (let i = 0; i < Math.abs(moves.length - this.difficulty); i++) {
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
      // Inserimento dati nello storage e ricarica della pagina
      this.$session.set('gameDifficulty', this.gameDifficulty)
      this.$session.set('playerX', this.playerX)
      this.$session.set('playerO', this.playerO)
      this.$session.set('gameScoreX', this.gameScoreX)
      this.$session.set('gameScoreO', this.gameScoreO)
      window.location.reload()
    },

    // Messaggio scelta nome giocatore/i
    showPlayerMessage (typePlayer) {
      this.$swal({
        title: `Nome ${typePlayer}?`,
        input: 'text',
        inputLabel: 'Scrivi il tuo nome',
        showCancelButton: false,
        confirmButtonColor: '#0f871f',
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
          if (this.gameType === 'Giocatore') {
            this.showDifficultyMessage()
          } else if (this.gameType === 'Giocatori') {
            if (this.gamePlayer === 0) {
              this.gameRound = `Tocca a ${this.playerX}`
            } else if (this.gamePlayer === 1) {
              this.gameRound = `Tocca a ${this.playerO}`
            }
            this.play = true
          }
        }
        if (result.isDismissed) {
          if (this.gameType === 'Giocatore') {
            this.playerX = 'Giocatore'
            this.playerO = 'Computer'
            this.showDifficultyMessage()
          } else if (this.gameType === 'Giocatori') {
            this.playerX = 'Giocatore1'
            this.playerO = 'Giocatore2'
            if (this.gamePlayer === 0) {
              this.gameRound = `Tocca a ${this.playerX}`
            } else if (this.gamePlayer === 1) {
              this.gameRound = `Tocca a ${this.playerO}`
            }
            this.play = true
          }
        }
      })
      this.$forceUpdate()
    },

    // Messaggio scelta difficoltà partita
    showDifficultyMessage () {
      this.$swal({
        title: 'Difficoltà?',
        input: 'radio',
        inputOptions: ({
          'F': 'Facile',
          'D': 'Difficile'
        }),
        showCancelButton: false,
        confirmButtonColor: '#0f871f',
        inputValidator: (value) => {
          if (!value) {
            return 'Devi selezionare una difficoltà!'
          } else {
            this.gameDifficulty = value
          }
        }
      }).then((result) => {
        if (this.gamePlayer === 0) {
          this.gameRound = `Tocca a ${this.playerX}`
        } else if (this.gamePlayer === 1) {
          this.gameRound = `Tocca a ${this.playerO}`
          setTimeout(() => this.performMove(), 1000)
        }
        if (result.isDismissed) {
          this.gameDifficulty = 0
        }
        this.play = true
      })
    },

    // Messaggio risultato partita
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
    }

  }
}
</script>

<style scoped>
  .game-page {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .title-text {
    justify-content: center;
    margin: auto;
    font-size: 90px;
    width: 100%;
  }

  .type-text {
    justify-content: center;
    margin: auto;
    margin-bottom: 1.5rem;
    font-size: 30px;
    width: 100%;
  }

  .game-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    width: 432px;
  }

  .round-text {
    justify-content: center;
    margin: auto;
    margin-top: 1.5rem;
    font-size: 30px;
    width: 80%;
    border: 1px solid white;
    border-radius: 10px;
  }

  .menu-button {
    display: flex;
    flex-flow: row;
    margin-top: 2.5rem;
  }

  .reset-button {
    justify-content: center;
    margin: auto;
    padding: 1rem;
    width: 45%;
    border: 1px solid white;
    border-radius: 10px;
    background-color: darkgreen;
    cursor: pointer;
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    font-size: 30px;
  }

  .router-link-active {
    justify-content: center;
    margin: auto;
    padding: 1rem;
    width: 45%;
    border: 1px solid white;
    border-radius: 10px;
    background-color: darkgreen;
    cursor: pointer;
    box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
    font-size: 30px;
    color: white;
    text-decoration-line: none;
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

  @media (max-width: 500px) {
    .title-text {
      font-size: 80px;
    }

    .type-text {
      margin-bottom: 1rem;
      font-size: 20px;
    }

    .game-board {
      width: 372px;
    }

    .round-text {
      font-size: 20px;
      width: 70%;
    }

    .reset-button, .router-link-active {
      width: 40%;
      font-size: 20px;
    }
  }

  @media (max-width: 430px) {
    .title-text {
      font-size: 70px;
    }

    .type-text {
      margin-bottom: 1rem;
      font-size: 20px;
    }

    .game-board {
      width: 312px;
    }

    .round-text {
      font-size: 20px;
      width: 70%;
    }

    .reset-button, .router-link-active {
      width: 35%;
      font-size: 20px;
    }
  }

  @media (max-width: 380px) or (max-height: 700px) {
    .title-text {
      font-size: 60px;
    }

    .type-text {
      margin-bottom: 1rem;
      font-size: 17px;
    }

    .game-board {
      width: 312px;
    }

    .round-text {
      font-size: 17px;
      width: 65%;
    }

    .reset-button, .router-link-active {
      width: 40%;
      font-size: 17px;
    }
  }

  @media (max-width: 330px) {
    .title-text {
      font-size: 50px;
    }

    .type-text {
      margin-bottom: 0.5rem;
      font-size: 15px;
    }

    .game-board {
      width: 252px;
    }

    .round-text {
      font-size: 15px;
      width: 60%;
    }

    .reset-button, .router-link-active {
      width: 40%;
      font-size: 15px;
    }
  }
</style>
