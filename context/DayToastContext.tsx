'use client';
import { createContext, useContext, useState, type ReactNode } from "react";

type DayMode = 'add' | 'edit' | null;

interface DayToastContextType {
  isOpen: boolean;
  mode: DayMode;
  workoutId: number | null;
  openAdd: () => void;
  openEdit: (workoutId: number) => void;
  close: () => void;
}

const DayToastContext = createContext<DayToastContextType | null>(null);

export function DayToastProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<DayMode>(null);
  const [workoutId, setWorkoutId] = useState<number | null>(null);

  const openAdd = () => {
    setWorkoutId(null);
    setMode('add');
    setIsOpen(true);
  };

  const openEdit = (wId: number) => {
    setWorkoutId(wId);
    setMode('edit');
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setMode(null);
    setWorkoutId(null);
  };

  return (
    <DayToastContext.Provider value={{ isOpen, mode, workoutId, openAdd, openEdit, close }}>
      {children}
    </DayToastContext.Provider>
  );
}

export function useDayToast() {
  const ctx = useContext(DayToastContext);
  if (!ctx) throw new Error('useDayToast must be used inside DayToastProvider');
  return ctx;
}
