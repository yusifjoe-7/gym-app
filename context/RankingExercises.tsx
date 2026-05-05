// context/ExerciseRankingContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// ── Types ────────────────────────────────────────────────────
interface ExerciseRankingContextType {
  isOpen: boolean;
  openRanking: () => void;
  closeRanking: () => void;
  toggleRanking: () => void;

}

// ── Context ──────────────────────────────────────────────────
const ExerciseRankingContext = createContext<ExerciseRankingContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────
export function ExerciseRankingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExerciseRankingContext.Provider
      value={{
        isOpen,
        openRanking:   () => setIsOpen(true),
        closeRanking:  () => setIsOpen(false),
        toggleRanking: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </ExerciseRankingContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────
export function useExerciseRanking() {
  const ctx = useContext(ExerciseRankingContext);
  if (!ctx) {
    throw new Error("useExerciseRanking must be used inside <ExerciseRankingProvider>");
  }
  return ctx;
}