# Tic Tac Toe Game

A modern, beautifully designed Tic Tac Toe game built with React and styled with custom CSS.

## Features

- Dark/Light theme toggle
- Vibrant colored X and O pieces with glow effects
- Smooth animations and transitions
- Responsive design
- Move counter
- Win detection with visual feedback
- Draw detection

## Project Structure

```
TICTACTOE-MAIN/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── TicTacTeo/
│   │       ├── TicTacTeo.css
│   │       └── TicTacTeo.jsx
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── jsconfig.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or extract the project files
2. Navigate to the project directory:

```bash
cd tic-tac-toe
```

3. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

The app will open at http://localhost:3000

### Building for Production

Create an optimized production build:

```bash
npm run build
```

## How to Play

1. Two players take turns clicking on empty cells
2. The first player is X, the second is O
3. The first player to get three in a row (horizontally, vertically, or diagonally) wins
4. If all cells are filled with no winner, it's a draw

## Technologies Used

- React 19.2.0
- CSS3 with custom animations
- Lucide React for icons

## License

MIT
