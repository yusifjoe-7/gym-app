'use clint';
import { useEffect, useState } from "react";
import type { workout } from "@/type/types";
import {Button} from "@/components/ui/button";
import { useExerciseRanking } from "@/context/RankingExercises";
import { useAddAndEditToast } from "@/context/Addandedittoastcontext";


function Exercises({id}:{id:number}) {
  const [day, setDay] = useState<workout>()
  const {openRanking} = useExerciseRanking()
  const{openAdd, openEdit, isOpen}=useAddAndEditToast()

     useEffect(()=>{
        const getDB = async()=>{
          const { dbPromise } = await import("@/lib/db")
          const db = await dbPromise;
      const data = await db.getAll('workouts');
     const workout = data.find((item)=> item.id === id)
     setDay(workout)
     
        }
     getDB() },[id, openRanking, isOpen])
  
  return (
    
    <div className="w-[90%] sm:w-full flex flex-col mx-auto mt-10 sm:mt-8.75">
  {day && day.exercises && day.exercises.map((item) => (
    <div key={item.id} className="w-full sm:w-[80%] py-4 my-3 rounded-2xl shadow p-3 bg-card flex flex-col gap-3 px-5 sm:px-10 sm:mx-auto hover:scale-101 transition cursor-pointer border-border border-2"
    onClick={()=>openEdit([id, item.id])}
    >
      <h2 className="text-lg mt-3 font-bold border-b-2 border-primary pb-2 pl-2">{item.name}</h2>
      <div className="text-xs px-2 flex flex-col gap-2">
        <div className="flex items-center justify-between ">
        <p>sets: {item.sets}</p>
        <p>reps: {item.reps.join(" - ")}</p>
        <p>weight: {item.weight.join(" - ")}</p>  
      </div>
      <div className="flex gap-[7%] mb-2 ">
        <p >RIR: {item.rir}</p>
        <p>target muscle: <span className="text-chart-4">{item.targetMuscle}</span></p>
      </div>
      </div>

    </div>
  ))}
  
    {day && day.exercises && day.exercises.length >0 &&(
      <div className="w-full flex flex-col items-center gap-3.5 mt-5 sm:hidden">
      <div className="w-full flex justify-between">
       < Button className="bg-bg text-foreground inner-border-2 border-primary w-[65%] py-5 " onClick={()=>openAdd(id)}>add
       <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
       </Button>
        <Button className="bg-bg text-foreground inner-border-2 border-primary w-[33%] py-5 " onClick={openRanking}>edit
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </Button>
      </div>
    <Button className="w-full py-5">Start</Button>
      </div>
    )}
    {!day&& 
    <div className="w-[90%] sm:w-full flex flex-col mx-auto mt-30 items-center justify-center">
      <h1>please select a day</h1>
    </div>
    }
  {day&& !day.exercises || day?.exercises.length ===0 &&
  <div className="w-full flex flex-col h-[70vh] items-center justify-center gap-5"
  onClick={()=>openAdd(id)}
  >
    <span className="opacity-60 cursor-pointer">

    <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
    </span>
    <p>tap to add </p>
  </div>
  }
  

</div>
  )
}

export default Exercises
