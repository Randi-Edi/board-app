import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockBoardData } from "../lib/mockData";
import { Column } from "../lib/interfaces/colum";
import { Task } from "../lib/interfaces/task";

interface BoardState {
  board: Column[];
  moveTask: (
    taskId: string,
    fromColId: string,
    toColId: string,
    toIndex: number
  ) => void;
  moveTaskWithinColumn: (
    colId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      board: mockBoardData,

      moveTask: (taskId, fromColId, toColId, toIndex) =>
        set((state) => {
          const boardCopy = JSON.parse(JSON.stringify(state.board));

          const fromCol = boardCopy.find((c: Column) => c.id === fromColId);
          const toCol = boardCopy.find((c: Column) => c.id === toColId);

          if (!fromCol || !toCol) return state;

          // Find and remove task from old column
          const taskIndex = fromCol.tasks.findIndex(
            (_t: Task, idx: number) => `${fromColId}-${idx}` === taskId
          );
          if (taskIndex === -1) return state;

          const [movedTask] = fromCol.tasks.splice(taskIndex, 1);

          // Insert into target column at the correct position
          if (toIndex !== undefined && toIndex >= 0) {
            toCol.tasks.splice(toIndex, 0, movedTask);
          } else {
            toCol.tasks.push(movedTask);
          }

          return { board: boardCopy };
        }),

      moveTaskWithinColumn: (colId, fromIndex, toIndex) =>
        set((state) => {
          const boardCopy = JSON.parse(JSON.stringify(state.board));

          const column = boardCopy.find((c: Column) => c.id === colId);
          if (!column) return state;

          const [movedTask] = column.tasks.splice(fromIndex, 1);
          column.tasks.splice(toIndex, 0, movedTask);

          return { board: boardCopy };
        }),
    }),

    { name: "board-storage" }
  )
);
