import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [gameStarted, setGameStarted] = useState(false); //Para verificar se o jogo começou
  const [newGame, setNewGame] = useState(false);

  const handleClick = (index) => {
    if (!gameStarted) return; //O jogo não começa até serem inseridos os nomes
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  //Reset
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  //reiniciar com novos nomes
  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setPlayerXName('');
    setPlayerOName('');
    setIsXNext(true);
    setGameStarted(false);
    setNewGame(false);
  };

  const renderSquare = (index) => {
    return (
      <Square value={squares[index]} onClick={() => handleClick(index)} />
    );
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null);

  let status;
  if (winner){
    status = 'Vencedor(a): ' + (winner === 'X' ? playerXName : playerOName);
  }else if(isDraw){
    status = 'EMPATE'; 
  }else{
    status = 'Próximo jogador(a): ' + (isXNext ? playerXName : playerOName);
  }

  // Iniciar o jogo ao inserir os nomes
  const startGame = () => {
    if (playerXName && playerOName) {
      setGameStarted(true);
    } else {
      alert('Por favor, insira os nomes de ambos os jogadores.');
    }
  };

  return (
    <div>
      {!gameStarted ? (
        <div className="player-inputs">
          <div>
            <label>Nome do Jogador(a) X: </label>
            <input
              type="text"
              value={playerXName}
              onChange={(e) => setPlayerXName(e.target.value)}
            />
          </div>
          <div>
            <label>Nome do Jogador(a) O: </label>
            <input
              type="text"
              value={playerOName}
              onChange={(e) => setPlayerOName(e.target.value)}
            />
          </div>
          <button className="start-button" onClick={startGame}>Iniciar Jogo</button>
        </div>
      ) : (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <button className="reset-button" onClick={handleReset}>Reset</button>
          <button className="new-game-button" onClick={() => setNewGame(true)}>Novo Jogo</button>
        </div>
      )}

      {newGame && (
        <div className="new-game-confirm">
          <p>Deseja iniciar um novo jogo?</p>
          <button className="confirm-button" onClick={handleNewGame}>Sim</button>
          <button className="cancel-button" onClick={() => setNewGame(false)}>Não</button>
        </div>
      )}
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],  //1 linha
    [3, 4, 5],  //2 linha
    [6, 7, 8],  //3 linha
    [0, 3, 6],  //1 coluna
    [1, 4, 7],  //2 coluna
    [2, 5, 8],  //3 coluna
    [0, 4, 8],  //1 diagonal
    [2, 4, 6],  //2 diagonal
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //verifica se os valores a,b,c sao iguais
      return squares[a];                                                        //caso sejam, significa que contem o mesmo simbolo X/O
    }
  }
  return null;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='credits'>Trabalho feito por: Tomás Araújo</div>
        <h1>Jogo do Galo</h1>
        <Board />
      </header>
    </div>
  );
}

export default App;
