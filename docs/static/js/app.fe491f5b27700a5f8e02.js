webpackJsonp([1],{"/ydw":function(e,t){},KGbF:function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("7+uW"),s=i("NOK/"),o=i.n(s),r=(i("UdIB"),i("RPkq")),n=i.n(r),l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("div",{staticClass:"title-text"},[this._v("\n    Tic Tac Toe\n  ")]),this._v(" "),t("router-link",{attrs:{to:"/TicTacToe/Giocatore"}},[t("div",{staticClass:"gametype-button"},[t("a",[this._v("UN GIOCATORE")])])]),this._v(" "),t("router-link",{attrs:{to:"/TicTacToe/Giocatori"}},[t("div",{staticClass:"gametype-button"},[t("a",[this._v("DUE GIOCATORI")])])])],1)},staticRenderFns:[]};var c=i("VU/8")({created:function(){this.$session.exists("playerX")&&(this.$session.remove("gameDifficulty"),this.$session.remove("playerX"),this.$session.remove("playerO"),this.$session.remove("gameScoreX"),this.$session.remove("gameScoreO"))}},l,!1,function(e){i("/ydw")},null,null).exports,u={name:"app",component:{Menu:c}},h={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var m=i("VU/8")(u,h,!1,function(e){i("ld7d")},null,null).exports,f=i("/ocq"),p=i("Zrlr"),y=i.n(p),v=i("wxAW"),d=i.n(v),g=function(){function e(){y()(this,e),this.cells=[["","",""],["","",""],["","",""]]}return d()(e,[{key:"doMove",value:function(e,t,i){return""===this.cells[e][t]&&(this.cells[e][t]=i,!0)}},{key:"getScore",value:function(){var e=0;return this.playerHas3InARow("x")&&(e-=100),this.playerHas3InARow("o")&&(e+=100),e}},{key:"playerHas3InARow",value:function(e){for(var t=0;t<3;t++)if(this.cells[0][t]===e&&this.cells[1][t]===e&&this.cells[2][t]===e)return!0;for(var i=0;i<3;i++)if(this.cells[i][0]===e&&this.cells[i][1]===e&&this.cells[i][2]===e)return!0;return this.cells[0][0]===e&&this.cells[1][1]===e&&this.cells[2][2]===e||this.cells[2][0]===e&&this.cells[1][1]===e&&this.cells[0][2]===e}},{key:"isGameOver",value:function(){return 0===this.getPossibleMoves().length||this.playerHas3InARow("x")||this.playerHas3InARow("o")}},{key:"clone",value:function(){for(var t=new e,i=0;i<3;i++)for(var a=0;a<3;a++)t.cells[i][a]=this.cells[i][a];return t}},{key:"getPossibleMoves",value:function(){for(var e=[],t=0;t<3;t++)for(var i=0;i<3;i++)""===this.cells[t][i]&&e.push({x:t,y:i});return e}}]),e}(),O={created:function(){var e=this;this.$session.exists("playerX")?(this.gameDifficulty=this.$session.get("gameDifficulty"),this.playerX=this.$session.get("playerX"),this.playerO=this.$session.get("playerO"),this.gameScoreX=this.$session.get("gameScoreX"),this.gameScoreO=this.$session.get("gameScoreO"),"Giocatore"===this.gameType?0===this.gamePlayer?this.gameRound="Tocca a "+this.playerX:1===this.gamePlayer&&(this.gameRound="Tocca a "+this.playerO,setTimeout(function(){return e.performMove()},1e3)):"Giocatori"===this.gameType&&(0===this.gamePlayer?this.gameRound="Tocca a "+this.playerX:1===this.gamePlayer&&(this.gameRound="Tocca a "+this.playerO)),this.play=!0):this.showPlayerMessage("giocatore X")},data:function(){return{gameOver:!1,gameOverText:"",gamePlayer:Math.round(Math.random()),gameType:this.$route.params.type,gameRound:"",gameDifficulty:"D",gameScoreX:0,gameScoreO:0,gameColor:"yellow",playerX:"",playerO:"",difficulty:0,firstCell:!1,play:!1,board:new g}},methods:{performMove:function(e,t){var i=this;if("Giocatore"===this.gameType){if(0===this.gamePlayer){if(this.gameOver)return;if(!this.board.doMove(e,t,"x"))return;if(this.$forceUpdate(),this.board.isGameOver())return this.gameOver=!0,this.gameOverText=this.board.playerHas3InARow("x")?"Hai vinto!":"Pari",this.board.playerHas3InARow("x")&&this.gameScoreX++,void this.showResultMessage();this.gamePlayer=1,this.gameRound="Tocca a "+this.playerO,this.$forceUpdate(),setTimeout(function(){return i.performMove()},1e3)}else if(1===this.gamePlayer){"F"===this.gameDifficulty?this.difficulty=Math.round(Math.random()):"D"===this.gameDifficulty&&(this.difficulty=0);var a=this.minimax(this.board.clone(),"o");this.board.doMove(a.move.x,a.move.y,"o"),this.board.isGameOver()&&(this.gameOver=!0,this.gameOverText=this.board.playerHas3InARow("o")?"Hai perso!":"Pari",this.board.playerHas3InARow("o")&&this.gameScoreO++,setTimeout(function(){return i.showResultMessage()},1e3)),this.gamePlayer=0,this.gameRound="Tocca a "+this.playerX,this.$forceUpdate()}}else if("Giocatori"===this.gameType)if(0===this.gamePlayer){if(this.gameOver)return;if(!this.board.doMove(e,t,"x"))return;if(this.$forceUpdate(),this.board.isGameOver())return this.gameOver=!0,this.gameOverText=this.board.playerHas3InARow("x")?"Ha vinto "+this.playerX+"!":"Pari",this.board.playerHas3InARow("x")&&this.gameScoreX++,void this.showResultMessage();this.gamePlayer=1,this.gameRound="Tocca a "+this.playerO,this.$forceUpdate()}else if(1===this.gamePlayer){if(this.gameOver)return;if(!this.board.doMove(e,t,"o"))return;this.$forceUpdate(),this.board.isGameOver()&&(this.gameOver=!0,this.gameOverText=this.board.playerHas3InARow("o")?"Ha vinto "+this.playerO+"!":"Pari",this.board.playerHas3InARow("o")&&this.gameScoreO++,this.showResultMessage()),this.gamePlayer=0,this.gameRound="Tocca a "+this.playerX,this.$forceUpdate()}this.firstCell||(this.firstCell=!0)},minimax:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(e.isGameOver())return{score:e.getScore()+i,move:null};for(var a="o"===t?-1e4:1e4,s=null,o=e.getPossibleMoves(),r=0;r<Math.abs(o.length-this.difficulty);r++){var n=o[r],l=e.clone();l.doMove(n.x,n.y,t);var c=this.minimax(l,"x"===t?"o":"x",i+1).score;("o"===t&&c>a||"x"===t&&c<a)&&(a=c,s=n)}return{score:a,move:s}},reset:function(){this.$session.set("gameDifficulty",this.gameDifficulty),this.$session.set("playerX",this.playerX),this.$session.set("playerO",this.playerO),this.$session.set("gameScoreX",this.gameScoreX),this.$session.set("gameScoreO",this.gameScoreO),window.location.reload()},showPlayerMessage:function(e){var t=this;this.$swal({title:"Nome "+e+"?",input:"text",inputLabel:"Scrivi il tuo nome",showCancelButton:!1,confirmButtonColor:"#0f871f",inputValidator:function(e){if(!e)return"Devi inserire un nome!";""===t.playerX?(t.playerX=e,"Giocatore"===t.gameType?t.playerO="Computer":"Giocatori"===t.gameType&&t.showPlayerMessage("giocatore O")):""===t.playerO&&(t.playerO=e)}}).then(function(e){e.isConfirmed&&("Giocatore"===t.gameType?t.showDifficultyMessage():"Giocatori"===t.gameType&&(0===t.gamePlayer?t.gameRound="Tocca a "+t.playerX:1===t.gamePlayer&&(t.gameRound="Tocca a "+t.playerO),t.play=!0)),e.isDismissed&&("Giocatore"===t.gameType?(t.playerX="Giocatore",t.playerO="Computer",t.showDifficultyMessage()):"Giocatori"===t.gameType&&(t.playerX="Giocatore1",t.playerO="Giocatore2",0===t.gamePlayer?t.gameRound="Tocca a "+t.playerX:1===t.gamePlayer&&(t.gameRound="Tocca a "+t.playerO),t.play=!0))}),this.$forceUpdate()},showDifficultyMessage:function(){var e=this;this.$swal({title:"Difficoltà?",input:"radio",inputOptions:{F:"Facile",D:"Difficile"},showCancelButton:!1,confirmButtonColor:"#0f871f",inputValidator:function(t){if(!t)return"Devi selezionare una difficoltà!";e.gameDifficulty=t}}).then(function(t){0===e.gamePlayer?e.gameRound="Tocca a "+e.playerX:1===e.gamePlayer&&(e.gameRound="Tocca a "+e.playerO,setTimeout(function(){return e.performMove()},1e3)),t.isDismissed&&(e.gameDifficulty=0),e.play=!0})},showResultMessage:function(){var e=this;this.$swal({title:this.gameOverText,showCancelButton:!1,showDenyButton:!0,confirmButtonText:"RIAVVIA",denyButtonText:"HOME",confirmButtonColor:"#0f871f",denyButtonColor:"#0f871f"}).then(function(t){t.isConfirmed&&e.reset(),t.isDenied&&e.$router.push("/"),t.isDismissed&&window.location.reload()})}}},T={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"game-page"},[i("div",{staticClass:"title-text"},[e._v("\n    Tic Tac Toe\n  ")]),e._v(" "),1==e.play?i("div",{staticClass:"type-text"},[e._v("\n    "+e._s(e.gameScoreX)+" - "+e._s(e.playerX)+" VS "+e._s(e.playerO)+" - "+e._s(e.gameScoreO)+"\n  ")]):e._e(),e._v(" "),e._l(3,function(t,a){return i("div",{staticClass:"game-board"},e._l(3,function(t,s){return i("div",[i("cell",{attrs:{value:e.board.cells[a][s]},on:{click:function(t){return e.performMove(a,s)}}})],1)}),0)}),e._v(" "),1==e.play?i("div",{staticClass:"round-text"},[e._v("\n    "+e._s(e.gameRound)+"\n  ")]):e._e(),e._v(" "),i("div",{staticClass:"menu-button"},[1==e.firstCell?i("div",{staticClass:"reset-button",on:{click:function(t){return e.reset()}}},[e._v("\n      RIAVVIA\n    ")]):e._e(),e._v(" "),i("router-link",{attrs:{to:"/"}},[i("div",{staticClass:"home-button"},[i("a",[e._v("HOME")])])])],1)],2)},staticRenderFns:[]};var w=i("VU/8")(O,T,!1,function(e){i("KGbF")},"data-v-51ec6e68",null).exports;a.a.use(f.a);var R=new f.a({routes:[{path:"/",name:"Menu",component:c},{path:"/TicTacToe/:type",name:"TicTacToe",component:w}]}),_={props:{value:String}},x={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"cell",on:{click:function(t){return e.$emit("click")}}},[""!==e.value?i("span",[e._v(e._s(e.value))]):e._e()])},staticRenderFns:[]};var b=i("VU/8")(_,x,!1,function(e){i("Z6g5")},"data-v-f195894e",null).exports;a.a.config.productionTip=!1,a.a.use(o.a),a.a.use(n.a),a.a.component("menu",c),a.a.component("tic-tac-toe",w),a.a.component("cell",b),new a.a({el:"#app",router:R,components:{App:m},template:"<App/>",render:function(e){return e(m)}}),document.body.style.overflow="hidden"},UdIB:function(e,t){},Z6g5:function(e,t){},ld7d:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.fe491f5b27700a5f8e02.js.map