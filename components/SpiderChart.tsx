'use client';

import { exercise } from "@/type/types";
import { useEffect, useState } from "react";
import { ChartRadarDots, chartType } from "@/components/theSpiderChart";
import {targetMuscle} from "@/type/types"


function SpiderChart() {
  
  const [musclesCount, setMusclesCount] = useState({
    chest: 0,
    lats: 0,
    upperBack: 0,
    lowerBack: 0,
    frontDelts: 0,
    backDelts: 0,
    sideDelts: 0,
    traps: 0,
    triceps: 0,
    biceps: 0,
    abs: 0,
    glutes: 0,
    calves: 0,
    quads: 0,
    hamstrings: 0,
  });

 
  const muscles = [
    "chest",
    "lats",
    "upperBack",
    "lowerBack",
    "frontDelts",
    "backDelts",
    "sideDelts",
    "traps",
    "triceps",
    "biceps",
    "abs",
    "glutes",
    "calves",
    "quads",
    "hamstrings",
  ] as const;

 
  const countTargetMuscle = async (targetMuscle: string) => {
    const { dbPromise } = await import("@/lib/db");
    const db = await dbPromise;
    const allDays = await db.getAll("workouts");

    let count = 0;

    allDays.forEach((day) => {
      day.exercises?.forEach((ex: exercise) => {
        if (ex.targetMuscle === targetMuscle) {
          count++;
        }
      });
    });

    return count;
  };


  const loadCounts = async () => {
    const results = await Promise.all(
      muscles.map(async (muscle) => {
        const count = await countTargetMuscle(muscle);
        return { muscle, count };
      })
    );

    setMusclesCount((prev) => {
      const updated = { ...prev };

      results.forEach(({ muscle, count }) => {
        updated[muscle] = count;
      });

      return updated;
    });
  };


  useEffect(() => {
    loadCounts();
  }, []);

const chartData: chartType[] = Object.entries(musclesCount).map(
  ([muscle, count]) => ({
    muscle: muscle as targetMuscle,
    count,
  })
);


  return (
    <div>

      <ChartRadarDots chart={chartData} />
    </div>
  );
}

export default SpiderChart;