"use client"

import { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

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
          relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl
          transition-all duration-200 cursor-pointer
          border-2 border-border/30 hover:border-accent-cyan
          flex items-center justify-center text-5xl sm:text-6xl font-bold
          ${value === "X" ? "text-accent-amber" : value === "O" ? "text-accent-cyan" : ""}
          ${isWinningCell ? "animate-glow bg-card/80" : "bg-card hover:bg-card/80"}
          ${gameStatus !== "playing" && !isWinningCell ? "opacity-50" : ""}
          animate-slide-in
        `}
      >
        {value && (
          <span
            className={`drop-shadow-lg ${value === "X" ? "text-accent-amber drop-shadow-[0_0_20px_rgba(255,180,0,0.6)]" : "text-accent-cyan drop-shadow-[0_0_20px_rgba(101,218,255,0.6)]"}`}
          >
            {value}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark" : ""}`}>
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 p-3 rounded-full bg-card border border-border/50 hover:border-accent-cyan transition-all duration-200 hover:scale-110"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-accent-amber" /> : <Moon className="w-5 h-5 text-accent-cyan" />}
        </button>

        <div className="flex flex-col items-center gap-8 sm:gap-12">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-accent-amber via-foreground to-accent-cyan bg-clip-text text-transparent">
                Tic Tac Toe
              </span>
            </h1>
            <p className="text-foreground/60 text-sm sm:text-base">
              {gameStatus === "playing"
                ? `${isXNext ? "✕" : "○"} Player's Turn`
                : gameStatus === "won"
                  ? `${winner} Wins! 🎉`
                  : "It's a Draw! 🤝"}
            </p>
          </div>

          <div
            ref={boardRef}
            className={`
              grid grid-cols-3 gap-3 sm:gap-4 p-6 sm:p-8
              bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50
              ${gameStatus === "won" ? "animate-pulse-scale" : ""}
            `}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderCell(index))}
          </div>

          <div className="text-center text-sm text-foreground/60">
            <p>
              Moves: <span className="font-semibold text-foreground">{moves}</span>
            </p>
          </div>

          <button
            onClick={resetGame}
            className={`
              px-8 py-4 rounded-xl font-semibold text-lg
              transition-all duration-200
              ${
                gameStatus === "playing"
                  ? "bg-card border border-border/50 hover:border-accent-cyan text-foreground hover:shadow-lg hover:scale-105"
                  : "bg-gradient-to-r from-accent-amber to-accent-cyan text-background hover:shadow-lg hover:scale-105"
              }
            `}
          >
            {gameStatus === "playing" ? "New Game" : "Play Again"}
          </button>
        </div>
      </div>
    </div>
  )
}
