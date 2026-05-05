"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type AddToastData = {
  isAdd: true;
  id: number;
};

type EditToastData = {
  isAdd: false;
  id: [number, number];
};

type ToastData = AddToastData | EditToastData;

type AddAndEditToastContextType = {
  isOpen: boolean;
  data: ToastData | null;
  openAdd: (id: number) => void;
  openEdit: (id: [number, number]) => void;
  close: () => void;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const AddAndEditToastContext = createContext<AddAndEditToastContextType | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export const AddAndEditToastProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ToastData | null>(null);

  const openAdd = (id: number) => {
    setData({ isAdd: true, id });
    setIsOpen(true);
  };

  const openEdit = (id: [number, number]) => {
    setData({ isAdd: false, id });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return (
    <AddAndEditToastContext.Provider value={{ isOpen, data, openAdd, openEdit, close }}>
      {children}
    </AddAndEditToastContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export const useAddAndEditToast = (): AddAndEditToastContextType => {
  const context = useContext(AddAndEditToastContext);
  if (!context) {
    throw new Error("useAddAndEditToast must be used within AddAndEditToastProvider");
  }
  return context;
};