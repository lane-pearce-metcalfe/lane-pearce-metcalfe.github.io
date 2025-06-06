import { boardSize, addBoardSizeClicks } from './boardSizeBtns.js'

addBoardSizeClicks()

let difficulty = 0.2
const grid = []
let minesFlagged = 0

export function createBoard() {
  firstClick = true
  minesFlagged = 0
  let HTML = ``
  for (let row = 0; row < boardSize; row++) {
    grid[row] = []
    for (let cell = 0; cell < boardSize; cell++) {
      const id = `${row}-${cell}`
      grid[row][cell] = { isMine: false, row, cell }
      HTML += `<div id="${id}" class="cell"></div>`
    }
  }
  document.getElementById('game-container').innerHTML = HTML
  addMines()
  addCellClicks()
}

let minesPlaced

function addMines() {
  const amountOfMines = boardSize * boardSize * difficulty

  minesPlaced = 0

  for (let i = 0; i < amountOfMines; i++) {
    const randRow = Math.floor(Math.random() * boardSize)
    let randCell = Math.floor(Math.random() * boardSize)
    if (!grid[randRow][randCell].isMine) {
      minesPlaced++
    }
    grid[randRow][randCell].isMine = true
  }
}

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

let firstClick = true

const colors = [
  'transparent',
  'blue',
  'green',
  'orange',
  'darkblue',
  'darkred',
  'cyan',
  'purple',
  'white',
]

function countMines(row, cell) {
  let mineCount = 0

  for (let i = 0; i < 8; i++) {
    const newRow = row + directions[i][0]
    const newCell = cell + directions[i][1]

    if (
      newRow >= 0 &&
      newRow < boardSize &&
      newCell >= 0 &&
      newCell < boardSize &&
      grid[newRow][newCell].isMine
    ) {
      if (firstClick === true) {
        grid[newRow][newCell].isMine = false
        minesPlaced--
      } else {
        mineCount++
      }
    }
  }

  const selectCell = document.getElementById(`${row}-${cell}`)
  if (selectCell) {
    selectCell.style.color = colors[mineCount]
  }

  return mineCount
}

function addCellClicks() {
  document.querySelectorAll('.cell').forEach((e) => {
    e.addEventListener('click', (event) => {
      if (!e.classList.contains('flagged')) {
        const [row, cell] = event.target.id.split('-').map(Number)
        if (!grid[row][cell].isMine || (grid[row][cell].isMine && firstClick)) {
          const mineCount = countMines(row, cell)
          if (firstClick === true) {
            firstClick = false
            if (grid[row][cell].isMine === true) {
              grid[row][cell].isMine = false
              minesPlaced--
            }
          }
          revealCell(mineCount, row, cell)
          event.target.textContent = mineCount
          event.target.classList.add('selected')
        } else {
          document.getElementById(`${row}-${cell}`).classList.add('mine')
        }
      }
    })

    e.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      const [row, cell] = event.target.id.split('-').map(Number)
      if (!e.classList.contains('selected')) {
        if (e.classList.contains('flagged')) {
          e.classList.remove('flagged')
          e.innerHTML = ``
          if (grid[row][cell].isMine === true) {
            minesFlagged--
          }
        } else {
          e.classList.add('flagged')
          e.innerHTML = `<img src="img/flag.png" class="flag" draggable="false">`
          if (grid[row][cell].isMine === true) {
            minesFlagged++
            if (minesFlagged === minesPlaced) {
              winGame()
            }
          }
        }
      }
    })
  })
}

function winGame() {
  document.querySelectorAll('.cell').forEach((e) => {
    if (e.innerHTML === ``) {
      const [row, cell] = e.id.split('-').map(Number)
      const mineCount = countMines(row, cell)
      if (!grid[row][cell].isMine) {
        e.textContent = mineCount
        e.classList.add('selected')
      }
    }
  })
}

function revealCell(mineCount, row, cell, visited = new Set()) {
  const id = `${row}-${cell}`
  if (visited.has(id)) return
  visited.add(id)

  const element = document.getElementById(id)

  if (
    row < 0 ||
    row >= boardSize ||
    cell < 0 ||
    cell >= boardSize ||
    element.textContent !== ''
  )
    return

  element.classList.add('selected')
  element.textContent = mineCount

  if (mineCount === 0) {
    element.textContent = ``
    for (let [dx, dy] of directions) {
      const newRow = row + dx
      const newCell = cell + dy

      revealCell(countMines(newRow, newCell), newRow, newCell, visited)
    }
  }
}

createBoard()
