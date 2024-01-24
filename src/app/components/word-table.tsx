"use client";

import React, { useEffect, useState } from "react";
import WinPage from "./win";

interface WordTableProps {
  name1: string;
  name2: string;
}

interface Position {
  row: number;
  col: number;
}

const WordTable = ({ name1, name2 }: WordTableProps) => {
  const gridSize = 15;
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ row: -1, col: -1 });
  const [endPos, setEndPos] = useState<Position>({ row: -1, col: -1 });
  const [foundWords, setFoundWords] = useState<Position[][]>([]);
  // const [foundWordsArray, setFoundWordsArray] = useState<String[]>([]);
  const [numWords, setNumWords] = useState(3);
  const [win, setWin] = useState(false);

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

    return (
      isPartOfFoundWord ||
      (isRowSelected && isColInRange) ||
      (isColSelected && isRowInRange)
    );
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    const initialGrid = Array.from({ length: gridSize }, () =>
      new Array(gridSize).fill(null)
    );

    const placeWordInGrid = (
      word: string,
      row: number,
      col: number,
      direction: string
    ) => {
      if (direction === "horizontal" && col + word.length <= gridSize) {
        for (let i = 0; i < word.length; i++) {
          initialGrid[row][col + i] = word[i];
        }
      } else if (direction === "vertical" && row + word.length <= gridSize) {
        for (let i = 0; i < word.length; i++) {
          initialGrid[row + i][col] = word[i];
        }
      }
    };

    const fillGrid = (gridToFill: string[][]) => {
      for (let row = 0; row < gridSize; row++) {
        for (let cell = 0; cell < gridSize; cell++) {
          if (gridToFill[row][cell] === null) {
            gridToFill[row][cell] =
              alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }
      }
    };

    placeWordInGrid(name1, 0, 0, "horizontal");
    placeWordInGrid(name2, 1, 0, "horizontal");
    placeWordInGrid("loves", 2, 0, "horizontal");

    const placeWords = (name1: string, name2: string) => {
      const words = [name1, name2, "loves"];
      const directions = ["horizontal", "vertical"];
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const direction = directions[Math.floor(Math.random() * 2)];
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        placeWordInGrid(word, row, col, direction);
      }
    };

    // placeWords(name1, name2);
    fillGrid(initialGrid);
    setGrid(initialGrid);
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
    </div>
  );
};

export default WordTable;
