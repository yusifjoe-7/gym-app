import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState} from "react"
import type { workout } from "@/type/types"
import { Button } from "./ui/button"
import ExercisesEditToast from "@/components/toasts/exercisesEditToast"
import { useExerciseRanking } from "@/context/RankingExercises"
import { useAddAndEditToast } from "@/context/Addandedittoastcontext"
import Link from "next/link"






function Days({changeId}:{changeId:(id: number) => void}) {

  

const {openRanking, isOpen} = useExerciseRanking()
const{openAdd}=useAddAndEditToast()

  const [days, setDays] = useState<workout[]>([])
  const [id, setId] =useState<string>()
   useEffect(()=>{
      const getDB = async()=>{
        const { dbPromise } = await import("@/lib/db")
        const db = await dbPromise;
    const data = await db.getAll('workouts');
    setDays(data)
    
      }
   getDB() },[])

  return (
    <div className="sm:w-[66%] w-full flex flex-col items-center sm:bg-muted sm:min-h-screen border-primary border-r">
    <div className="flex items-center justify-between w-full sm:w-[80%]  px-5 bg-card pt-10 sm:pt-5 sm:mt-20 shadow-sm pb-5 border-t-5 border-primary sm:rounded-2xl rounded-b-2xl">
        <h2>what day is today?</h2>
      <Select onValueChange={(value)=> {
        setId(value)
        changeId(Number(value))}}
        >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a day" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        
          {days.map((item) => (
  <SelectItem key={item.id} value={String(item.id)}>
    {item.dayName}
  </SelectItem>
))}
<Link href="/workouts/days-edit">
<div className={`py-1 my-1 px-2 text-xs border-t border-chart-1 ${days.length>0? null :'py-3'} `}>{days.length>0? "edit": "add a day"}</div></Link>
        </SelectGroup>
      </SelectContent>
    </Select>
    
    </div>
    {id&&
    <div className="w-full px-3 sm:flex flex-col items-center justify-between hidden mt-10 gap-2">
      <div className="w-[60%] flex justify-between items-center">
       <Button className="bg-bg w-[65%] py-4 text-foreground inner-border-2 border-primary hover:py-5 shadow-xs" onClick={()=>openAdd(Number(id))}>Add exercise
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
       </Button>
       <Button className="bg-bg w-[33%] py-4 text-foreground inner-border-2 border-primary hover:py-5 shadow-xs" onClick={()=>days[Number(id)]?.exercises?.length>=0?openRanking(): null}>Edit
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
       </Button>
       </div>
    <Button className="py-4 w-[60%] shadow-xl hover:py-5 ">Start</Button>
      </div>
    }
    {isOpen&&<ExercisesEditToast id={id?Number(id):0}/> }
    
    </div>
  )
}

export default Days
