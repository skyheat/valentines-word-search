"use client";

import { useEffect, useState } from "react";
import WinPage from "./win";

interface WordTableProps {
  name1: string;
  name2: string;
}

interface Position {
  row: number;
  col: number;
}

interface WordPosition {
  word: string;
  startPos: Position;
  endPos: Position;
}

const WordTable = ({ name1, name2 }: WordTableProps) => {
  const gridSize = 15;
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ row: -1, col: -1 });
  const [endPos, setEndPos] = useState<Position>({ row: -1, col: -1 });
  const [foundWords, setFoundWords] = useState<Position[][]>([]);
  const [numWords, setNumWords] = useState(3);
  const [win, setWin] = useState(false);
  const [wordPos, setWordPos] = useState<WordPosition[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleMouseDown = (rowIndex: number, cellIndex: number) => {
    setIsSelecting(true);
    setStartPos({ row: rowIndex, col: cellIndex });
    setEndPos({ row: rowIndex, col: cellIndex });
  };

  const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
    if (isSelecting) {
      setEndPos({ row: rowIndex, col: cellIndex });
    }
  };

  const handleMouseUp = () => {
    if (isSelecting) {
      let word = "";
      let wordPositions: Position[] = [];
      // Horizontal selection
      if (grid && startPos.row === endPos.row) {
        for (
          let i = Math.min(startPos.col, endPos.col);
          i <= Math.max(startPos.col, endPos.col);
          i++
        ) {
          word += grid[startPos.row][i];
          wordPositions.push({ row: startPos.row, col: i });
        }
      }
      // Vertical selection
      if (grid && startPos.col === endPos.col) {
        for (
          let i = Math.min(startPos.row, endPos.row);
          i <= Math.max(startPos.row, endPos.row);
          i++
        ) {
          word += grid[i][startPos.col];
          wordPositions.push({ row: i, col: startPos.col });
        }
      }
      checkWord(word, wordPositions);
      setIsSelecting(false);
    }
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLTableCellElement>,
    rowIndex: number,
    cellIndex: number
  ) => {
    event.preventDefault();
    handleMouseDown(rowIndex, cellIndex);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLTableCellElement>) => {
    if (isSelecting && event.touches.length > 0) {
      const touch = event.touches[0];
      const target = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLTableCellElement;
      const rowIndex = parseInt(target.dataset.rowIndex || "0", 10);
      const cellIndex = parseInt(target.dataset.cellIndex || "0", 10);
      handleMouseEnter(rowIndex, cellIndex);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const checkWord = (word: string, wordPositions: Position[]) => {
    const isSamePosition = (position1: Position[], position2: Position[]) => {
      if (position1.length !== position2.length) return false;
      return position1.every(
        (pos1, index) =>
          pos1.row === position2[index].row && pos1.col === position2[index].col
      );
    };

    const isAlreadyFound = foundWords.some((foundWordPositions) =>
      isSamePosition(foundWordPositions, wordPositions)
    );

    if (
      (word === name1.toLowerCase() ||
        word === name2.toLowerCase() ||
        word === "loves") &&
      !isAlreadyFound
    ) {
      setFoundWords([...foundWords, wordPositions]);
      const updatedNumWords = numWords - 1;
      setNumWords(updatedNumWords);

      if (updatedNumWords === 0) {
        setWin(true);
      }

      return true;
    }

    return false;
  };

  // Function to check if a cell is in the selected range for the cell highlight
  const isCellSelected = (rowIndex: number, cellIndex: number) => {
    const isRowSelected =
      startPos.row === endPos.row && rowIndex === startPos.row;
    const isColSelected =
      startPos.col === endPos.col && cellIndex === startPos.col;
    const isRowInRange =
      rowIndex >= Math.min(startPos.row, endPos.row) &&
      rowIndex <= Math.max(startPos.row, endPos.row);
    const isColInRange =
      cellIndex >= Math.min(startPos.col, endPos.col) &&
      cellIndex <= Math.max(startPos.col, endPos.col);

    const isPartOfFoundWord = foundWords.some((wordPositions) =>
      wordPositions.some((pos) => pos.row === rowIndex && pos.col === cellIndex)
    );

    const isPartOfAnswer =
      showAnswers &&
      wordPos.some(({ startPos, endPos }) => {
        return (
          rowIndex >= startPos.row &&
          rowIndex <= endPos.row &&
          cellIndex >= startPos.col &&
          cellIndex <= endPos.col
        );
      });

    return (
      isPartOfFoundWord ||
      isPartOfAnswer ||
      (isRowSelected && isColInRange) ||
      (isColSelected && isRowInRange)
    );
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    const initialGrid = Array.from({ length: gridSize }, () =>
      new Array(gridSize).fill(null)
    );

    setGrid(initialGrid);
    if (!grid) {
      console.error("grid not set");
      return;
    }

    const fillGrid = (gridToFill: string[][]) => {
      for (let row = 0; row < gridSize; row++) {
        for (let cell = 0; cell < gridSize; cell++) {
          if (gridToFill[row][cell] === null) {
            gridToFill[row][cell] =
              alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }
      }
      setGrid(gridToFill);
    };

    const placeWords = (name1: string, name2: string) => {
      const words = [name1.toLowerCase(), name2.toLowerCase(), "loves"];
      const directions = ["horizontal", "vertical"];
      const MAX_ATTEMPTS = 100; // Maximum attempts to place a word
      const positions: WordPosition[] = []; // To hold word positions

      words.forEach((word) => {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < MAX_ATTEMPTS) {
          const direction = directions[Math.floor(Math.random() * 2)];
          let row, col;

          if (direction === "horizontal") {
            row = Math.floor(Math.random() * gridSize);
            col = Math.floor(Math.random() * (gridSize - word.length));
          } else {
            row = Math.floor(Math.random() * (gridSize - word.length));
            col = Math.floor(Math.random() * gridSize);
          }

          if (
            checkFit(row, col, word.length, direction) &&
            checkOverlap(row, col, word, direction)
          ) {
            placeWordInGrid(word, row, col, direction, positions); // Modified to include positions
            placed = true;
          } else {
            attempts++;
          }
        }

        if (!placed) {
          console.error(`Failed to place word: ${word}`);
        }
      });

      setWordPos(positions); // Update the state with the word positions
    };

    const checkFit = (
      row: number,
      col: number,
      length: number,
      direction: string
    ) => {
      if (direction === "horizontal") {
        return col + length <= gridSize; // Check horizontal fit
      } else {
        return row + length <= gridSize; // Check vertical fit
      }
    };

    const checkOverlap = (
      row: number,
      col: number,
      word: string,
      direction: string
    ) => {
      for (let i = 0; i < word.length; i++) {
        const currentRow = direction === "horizontal" ? row : row + i;
        const currentCol = direction === "horizontal" ? col + i : col;
        const currentCell = grid[currentRow][currentCol];

        // Check if the cell is not empty and does not match the current word letter
        if (currentCell !== null && currentCell !== word[i]) {
          return false; // Invalid placement due to overlap
        }
      }
      return true; // Valid placement
    };

    const placeWordInGrid = (
      word: string,
      row: number,
      col: number,
      direction: string,
      positions: WordPosition[]
    ) => {
      const newGrid = grid;
      for (let i = 0; i < word.length; i++) {
        const currentRow = direction === "horizontal" ? row : row + i;
        const currentCol = direction === "horizontal" ? col + i : col;

        // Place the word letter in the grid
        newGrid[currentRow][currentCol] = word[i];
      }

      setGrid(newGrid);

      // Update the positions array with the word's start and end positions
      const startPos = { row, col };
      const endPos =
        direction === "horizontal"
          ? { row, col: col + word.length - 1 }
          : { row: row + word.length - 1, col };
      positions.push({ word, startPos, endPos });
    };

    placeWords(name1, name2);
    fillGrid(grid);
  }, [name1, name2]); // Dependency array

  if (!grid) {
    return <div>Loading...</div>;
  }

  if (win) {
    return <WinPage name1={name1} name2={name2} />;
  }
  return (
    <div className="w-5/6 md:w-1/2 text-center">
      <h1>Wordsearch</h1>
      <p>There are {numWords} remaining words!</p>
      <table className="select-none border-collapse table-auto w-full bg-slate-100">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  data-row-index={rowIndex}
                  data-cell-index={cellIndex}
                  className={`border border-black text-center align-middle font-mono uppercase ${
                    isCellSelected(rowIndex, cellIndex) ? "bg-blue-300" : ""
                  } text-sm md:text-base`}
                  onPointerDown={() => handleMouseDown(rowIndex, cellIndex)}
                  onPointerEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                  onPointerUp={handleMouseUp}
                  onTouchStart={(e) => handleTouchStart(e, rowIndex, cellIndex)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="mb-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
      >
        {showAnswers ? "Hide Answers" : "Show Answers"}
      </button>
    </div>
  );
};

export default WordTable;
