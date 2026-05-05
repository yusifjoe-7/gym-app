'use client';

import Days from "@/components/Days"
import Exercises from "@/components/Exercises";
import {  useState } from "react";
import AddOrEditExerciseToast from "@/components/toasts/AddOrEditExerciseToast"
import{useAddAndEditToast} from "@/context/Addandedittoastcontext"

  
 function page() {
  const {isOpen}=useAddAndEditToast()

    //that function for link Days with Exercyses
    const[idToPass, setIdToPass] = useState<number>(0)
    const TheDay=(id:number)=>{
      setIdToPass(id)
    }
    


  return (
    <div className="w-full min-h-screen sm:flex sm:items-start sm:mt-13" >
      <Days changeId={TheDay}/>
      <Exercises id={idToPass}/>
        
{isOpen&&<AddOrEditExerciseToast/>}
      
    </div>
  )
}

export default page
