'use client';

import { exercise, targetMuscle, workout } from "@/type/types";
import{
    Field,
  FieldLabel,
} from "../ui/field"
import {Input} from "../ui/input"
import {Button} from "../ui/button"

import { useEffect, useState } from "react";
import { useAddAndEditToast } from "@/context/Addandedittoastcontext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const muscles = [
  "chest",
  "lats",
  "upper back",
  "lower back",
  "front delts",
  "back delts",
  "side delts",
  "traps",
  "triceps",
  "biceps",
  "abs",
  "glutes",
  "calves",
  "quads",
  "hamstrings"
];



function AddOrEditExerciseToast() {

  //--the context-----
  const{close, data} = useAddAndEditToast()


  //----


  const isAdd = data?.isAdd;
const Dayid = data 
  ? data.isAdd 
    ? data.id          // number
    : data.id[0]       // [number, number][0]
  : undefined;
  
useEffect(() => {
  if (isAdd) return;

  const getDB = async () => {
    if (!Dayid) {
      close()
      return
    }
    const { dbPromise } = await import("@/lib/db")
    const db = await dbPromise;
    const day = await db.get("workouts", Dayid);
    const exer = day.exercises.find((item: exercise) => item.id === data?.id[1])
    setName(exer.name)
    setSets(exer.sets)
    setRIR(exer.rir)
    setRepsValue(exer.reps)
    setWeightValue(exer.weight)
  }

  getDB()
}, [])



  //---name-----
  const[name, setName] = useState<string>(isAdd?"":"")
  
  //--sets----

  const[sets, setSets] = useState<number>(0)


  //--RIR-----

  const [RIR, setRIR] = useState<number>(0)

  //---muscle----

  const[muscle, setMuscle] = useState<targetMuscle|null>()


  //--error---

  const[Error, setError] = useState<boolean>(false)


  
const [repsValue, setRepsValue] = useState<number[]>([])
const [weightValue, setWeightValue] = useState<number[]>([])


const handleChangeReps = (index: number, value: number) => {
    const newValues = [...repsValue];
    newValues[index] = value;
    setRepsValue(newValues);
  };

  const handleChangeWeight = (index: number, value: number) => {
    const newValues = [...weightValue];
    newValues[index] = value;
    setWeightValue(newValues);
  };

  const handleAdd = async()=>{
    if(name && sets && RIR && repsValue.length === sets && weightValue.length === sets && muscle){
      if(!Dayid){
        close()
        return
      } 

    const { dbPromise } = await import("@/lib/db")
        const db = await dbPromise;
        const day = await db.get("workouts", Dayid);

        if (!day) {
      close();
      return;
    }

        const id = (day.exercises?.length ?? 0) + 2; 
        
        const exer:exercise = {
          id:id? id : 1,
          name,
          sets,
          reps:repsValue,
          weight:weightValue,
          rir:RIR,
          targetMuscle:muscle,
        }
        day.exercises.push(exer)
        await db.put("workouts", day);
        close()

      
    
    }else{
      setError(true)
    }
  }
  const handleEdit = async()=>{
    const numSets = Number(sets)
     if(name && sets && RIR && repsValue.length === numSets && weightValue.length === numSets && muscle){
      if(!Dayid || !data ){
        close()
        return
      }
      

    const { dbPromise } = await import("@/lib/db")
        const db = await dbPromise;
        const day = await db.get("workouts", Dayid);
        const exerciseId = !data?.isAdd ? (data.id as [number, number])[1] : undefined;
        const newExercise: exercise = {
    id: exerciseId ? exerciseId : day.exercises.length + 1,
    name,
    sets,
    reps: repsValue,
    weight: weightValue,
    rir: RIR,
    targetMuscle: muscle,
  };
day.exercises = day.exercises.map((item: exercise) =>
  item.id === exerciseId ? newExercise : item
);

await db.put("workouts", day);

        close()

      
    
    }else{
      setError(true)
    }


  }

  const handleDlete = async()=>{
    if(!Dayid || !data ){
      close()
      return
    }
    const { dbPromise } = await import("@/lib/db")
        const db = await dbPromise;
        const day = await db.get("workouts", Dayid);
        const exerciseId = !data?.isAdd ? (data.id as [number, number])[1] : undefined;
    if(!day){
      close()
      return
    }
    day.exercises = day.exercises.filter((item:exercise)=> item.id !== exerciseId)
    await db.put("workouts", day);
    close()

  }


const isTargetMuscle = (value: string): value is targetMuscle => {
  return [
    "chest",
    "lats",
    "upper back",
    "lower back",
    "front delts",
    "back delts",
    "side delts",
    "traps",
    "triceps",
    "biceps",
    "abs",
    "glutes",
    "calves",
    "quads",
    "hamstrings",
  ].includes(value);
};

  return (
    <div className="fixed inset-0 z-500 backdrop-blur-xs flex flex-col items-center justify-center">
      <div className="w-[90%] max-w-md bg-card rounded-xl p-4 shadow-xl transition relative">
        <div className="absolute top-5 right-5 text-muted-foreground cursor-pointer" onClick={close}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      </div>
        <Field>
            <div className="mt-4 mb-2">
              <FieldLabel className="ml-3 mb-2">
                exercise 
            </FieldLabel>
            <Input type="text" placeholder="inter the name" className="py-3 shadow-xs"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            />
            </div>
            <div className="flex items-center gap-4 px-2">
              <div className="w-1/4 flex flex-col items-center justify-center gap-2">
              <FieldLabel className="">
                sets 
            </FieldLabel>
            <Input type="number" min={1} max={7} className="py-4 shadow-xs text-center "
            value={sets || ""}
            onChange={(e)=>{setSets(Number(e.target.value))}}
            />
            
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center gap-2">
              <FieldLabel className="">
                RIR 
            </FieldLabel>
            <Input type="number" min={1} max={7} className="py-4 shadow-xs text-center "
             value={RIR || ""}
            onChange={(e)=>{setRIR(Number(e.target.value))}}
            />
            
            </div>
            </div>


            {sets<0 || sets>8 && <p className="text-destructive text-xs ml-2 my-3"> the sets lamit is between 1-7</p>}
            
             {/* the reps*/}
            
            {sets>0 && sets<8 &&<p className="ml-2 block mt-3">reps</p>}
            <div className="grid grid-cols-7 gap-2 mb-5">
  {sets>0 && sets<8 && Array.from({length:sets}).map((item, index)=>(
    <div key={index} className="flex flex-col items-center justify-center" >
                <FieldLabel className="text-xs">
                  {index+1}
                </FieldLabel>
                <Input type="number" min={1} max={100} className="text-center py-5"
                value={repsValue[index]||""}
                onChange={(e)=> handleChangeReps(index, Number(e.target.value))}
                />
                </div>
                ))}
            
            </div>

                {/* the weight*/}
{sets>0 && sets<8 &&<span className="ml-2 flex items-center gap-1">weight
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
  KG
  </span>}

            <div className="grid grid-cols-7 gap-2 mb-5">
  {sets>0 && sets<8 && Array.from({length:sets}).map((item, index)=>(
    <div key={index} className="flex flex-col items-center justify-center" >
                <FieldLabel className="text-xs">
                  {index+1}
                </FieldLabel>
                <Input type="number" min={1} max={100} className="text-center py-5"
                value={weightValue[index]||""}
                onChange={(e)=> handleChangeWeight(index, Number(e.target.value))}
                />
                </div>
                ))}
            
            </div>
            {Error && <p className="ml-2 block mt-3 text-destructive text-xs">your data isn't full or you have an error</p>}
            <FieldLabel className="ml-3 mb-2">
                target muscle
            </FieldLabel>
            <Select
            onValueChange={(value)=>isTargetMuscle(value)?setMuscle(value):null}
            
        >
      <SelectTrigger className="w-[90%] mb-3">
        <SelectValue placeholder="Select a muscle" />
      </SelectTrigger>
      <SelectContent className="z-600">
        <SelectGroup >
        
          {muscles.map((item) => (
  <SelectItem key={item} value={item}>
    {item}
  </SelectItem>
))}
        </SelectGroup>
      </SelectContent>
    </Select>

        </Field>
      </div>
      <div className="w-full flex sm:flex-row flex-col items-center justify-center gap-3 mt-4">
        {!isAdd && 
 <Button onClick={handleDlete} className="w-[90%] sm:w-[45%] max-w-56 py-5 shadow-md bg-destructive hover:scale-102">Delete</Button>
}
        <Button onClick={isAdd? handleAdd: handleEdit} className={`w-[90%] ${isAdd?"max-w-md":"sm:w-[45%] max-w-56"} py-5 shadow-md hover:scale-102`}>{isAdd?"Add":"Edit"}</Button>

      </div>
    </div>
  )
}

export default AddOrEditExerciseToast
