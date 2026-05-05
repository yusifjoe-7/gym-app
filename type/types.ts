
export type exercise ={
    id:number,
    name:string,
    sets:number,
    reps:number[],
    weight:number[],
    rir:number,
    targetMuscle:targetMuscle
   
}

export type targetMuscle=
     "chest" | "lats" | "upper back" | "lower back" | "front delts" | "back delts" | "side delts" | "traps" | "triceps" | "biceps" |  "abs" | "glutes" | "calves" |"quads"|"hamstrings"


export type workout ={
    id:number,
    dayName:string,
    exercises:exercise[]


}