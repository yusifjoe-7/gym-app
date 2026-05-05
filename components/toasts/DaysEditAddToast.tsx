'use client';
import { useEffect, useState } from "react";
import { useDayToast } from "@/context/DayToastContext";
import { Button } from "@/components/ui/button";
import type { workout } from "@/type/types";

export default function DayToast() {
  const { isOpen, mode, workoutId, close } = useDayToast();
  const [dayName, setDayName] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'edit' && workoutId !== null) {
      const load = async () => {
        const { dbPromise } = await import("@/lib/db");
        const db = await dbPromise;
        const data: workout[] = await db.getAll('workouts');
        const found = data.find(w => w.id === workoutId);
        if (found) setDayName(found.dayName);
      };
      load();
    } else {
      setDayName('');
    }
  }, [isOpen, mode, workoutId]);

  const handleSave = async () => {
    const trimmed = dayName.trim();
    if (!trimmed) {
      setError("the name is emty");
      return;
    }

    const { dbPromise } = await import("@/lib/db");
    const db = await dbPromise;
    const data: workout[] = await db.getAll('workouts');

    if (mode === 'add') {
      const newId = data.length > 0 ? Math.max(...data.map(w => w.id)) + 1 : 1;
      const newWorkout: workout = {
        id: newId,
        dayName: trimmed,
        exercises: [],
      };
      await db.put('workouts', newWorkout);
    } else if (mode === 'edit' && workoutId !== null) {
      const existing = data.find(w => w.id === workoutId);
      if (!existing) return;
      await db.put('workouts', { ...existing, dayName: trimmed });
    }

    close();
  };

  const handleDelete = async () => {
    if (workoutId === null) return;
    const { dbPromise } = await import("@/lib/db");
    const db = await dbPromise;
    await db.delete('workouts', workoutId);
    close();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={close}
      />

      {/* Panel */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl shadow-2xl border-t border-border
                   sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                   sm:w-[380px] sm:rounded-2xl sm:border transition-all duration-300"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="px-5 pt-4 pb-6 sm:px-6 sm:pt-5 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">
              {mode === 'add' ? 'add day' : 'edit day'}
            </h2>
            <button
              onClick={close}
              className="w-7 h-7 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted-foreground">day name</label>
            <input
              type="text"
              value={dayName}
              onChange={e => {
                setDayName(e.target.value);
                setError('');
              }}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="e.g. push, pull, legs..."
              autoFocus
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary/50
                         placeholder:text-muted-foreground/50"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          {/* Actions */}
          <div className={`flex gap-2 ${mode === 'edit' ? 'justify-between' : 'justify-end'}`}>
            {mode === 'edit' && (
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 px-3"
                onClick={handleDelete}
              >
                delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={close}>cancel</Button>
              <Button onClick={handleSave}>save</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}