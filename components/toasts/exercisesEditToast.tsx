'use client';

import { useEffect, useState } from "react";
import type { exercise } from "@/type/types";
import {
  DndContext, closestCenter, DragEndEvent,
  useSensor, useSensors, PointerSensor, TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/SortableItem";
import { Button } from "../ui/button";
import { useExerciseRanking } from "@/context/RankingExercises";

function ExercisesEditToast({ id }: { id: number }) {
    const [days, setDays] = useState<exercise[] | undefined>();
    const {closeRanking} = useExerciseRanking()


  // ✅ All hooks must be called unconditionally, before any early return
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  useEffect(() => {
    const getDB = async () => {
      const { dbPromise } = await import("@/lib/db");
      const db = await dbPromise;
      const day = await db.get("workouts", id);
      if (day) setDays(day.exercises); // ✅ guard against undefined workout
    };
    getDB();
  }, [id]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !days) return;

    const oldIndex = days.findIndex((item) => item.id === active.id);
    const newIndex = days.findIndex((item) => item.id === over.id);
    setDays(arrayMove(days, oldIndex, newIndex));
  }

  // ✅ Early return AFTER all hooks
  if (!days) return null;

  const handleClick = async () => {
     const { dbPromise } = await import("@/lib/db");
    const db = await dbPromise;
    if (!id) return;
    const day = await db.get("workouts", id);
    await db.put("workouts", {
  ...day,
  exercises: days
}
);
    closeRanking()
  }

  return (
    <div className="fixed inset-0 z-500 backdrop-blur-xs flex flex-col items-center justify-center">
      <div className="w-[90%] max-w-md bg-card rounded-xl p-4 shadow-xl">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={days.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {days.map((item) => (
              <SortableItem key={item.id} exercise={item} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <Button className="my-5 w-[90%] max-w-md py-5 shadow-lg hover:scale-102"
      onClick={handleClick}
      >Done</Button>
    </div>
  );
}

export default ExercisesEditToast;
