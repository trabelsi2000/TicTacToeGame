"use client"

import { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import "./TicTacTeo.css"

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function TicTacToe() {
  const [isDark, setIsDark] = useState(true)
  const [board, setBoard] = useState(Array(9).fill(""))
  const [isXNext, setIsXNext] = useState(true)
  const [gameStatus, setGameStatus] = useState("playing")
  const [winner, setWinner] = useState("")
  const [moves, setMoves] = useState(0)
  const boardRef = useRef(null)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const checkGameStatus = (cells) => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a])
        setGameStatus("won")
        return
      }
    }

    if (cells.every((cell) => cell !== "")) {
      setGameStatus("draw")
    }
  }

  const handleCellClick = (index) => {
    if (board[index] !== "" || gameStatus !== "playing") return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"

    setBoard(newBoard)
    setMoves(moves + 1)
    setIsXNext(!isXNext)
    checkGameStatus(newBoard)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(""))
    setIsXNext(true)
    setGameStatus("playing")
    setWinner("")
    setMoves(0)
  }

  const renderCell = (index) => {
    const value = board[index]
    const isWinningCell =
      winner && WINNING_COMBINATIONS.some((combo) => combo.includes(index) && combo.every((i) => board[i] === winner))

    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className={`
          cell
          ${value === "X" ? "cell-x" : value === "O" ? "cell-o" : ""}
          ${isWinningCell ? "cell-winning" : ""}
          ${gameStatus !== "playing" && !isWinningCell ? "cell-disabled" : ""}
        `}
      >
        {value && <span className={`cell-value ${value === "X" ? "value-x" : "value-o"}`}>{value}</span>}
      </button>
    )
  }

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <div className="app-container">
        <button onClick={() => setIsDark(!isDark)} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? <Sun className="icon-sun" /> : <Moon className="icon-moon" />}
        </button>

        <div className="content">
          <div className="header">
            <h1 className="title">
              <span className="title-gradient">Tic Tac Toe</span>
            </h1>
            <p className="status-text">
              {gameStatus === "playing"
                ? `${isXNext ? "✕" : "○"} Player's Turn`
                : gameStatus === "won"
                  ? `${winner} Wins! 🎉`
                  : "It's a Draw! 🤝"}
            </p>
          </div>

          <div ref={boardRef} className={`board ${gameStatus === "won" ? "board-won" : ""}`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderCell(index))}
          </div>

          <div className="moves-counter">
            <p>
              Moves: <span className="moves-count">{moves}</span>
            </p>
          </div>

          <button
            onClick={resetGame}
            className={`reset-button ${gameStatus === "playing" ? "btn-playing" : "btn-finished"}`}
          >
            {gameStatus === "playing" ? "New Game" : "Play Again"}
          </button>
        </div>
      </div>
    </div>
  )
}
