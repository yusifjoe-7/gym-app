'use client'
import { useEffect, useState } from 'react'
import type { workout } from '@/type/types'
import {
  DndContext, closestCenter, DragEndEvent,
  useSensor, useSensors, PointerSensor, TouchSensor,
} from "@dnd-kit/core"
import {
  arrayMove, SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import SortableDayItem from '@/components/sortableItemDay'
import { useRouter } from 'next/navigation'
import { useDayToast } from '@/context/DayToastContext'
import DayToast from '@/components/toasts/DaysEditAddToast'



// ─── Main Page ───────────────────────────────────────────────────────
function Page() {
  const [days, setDays] = useState<workout[]>([])
  const router = useRouter()
const {openAdd, isOpen, openEdit}= useDayToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  )

  useEffect(() => {
    const getDB = async () => {
      const { dbPromise } = await import("@/lib/db")
      const db = await dbPromise
      const data = await db.getAll('workouts')
      setDays(data)
    }
    getDB()
  }, [isOpen])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = days.findIndex((item) => item.id === active.id)
    const newIndex = days.findIndex((item) => item.id === over.id)
    setDays(arrayMove(days, oldIndex, newIndex))
  }

  const handleSave = async () => {
    const { dbPromise } = await import("@/lib/db")
    const db = await dbPromise

    // Save each workout with its new order index
    await Promise.all(
      days.map((day, index) =>
        db.put('workouts', { ...day, order: index })
      )
    )
    router.push("/workouts")
  }
  
  if (!days.length) return null

  

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
        <span className='fixed top-10 right-10'>
            
        </span>
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Reorder Days</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={days.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {days.map((item) => (
              <div className="w-full" key={item.id} onClick={()=>openEdit(item.id)}>
              <SortableDayItem  workout={item}  />
           </div> ))}
          </SortableContext>
        </DndContext>

        <Button
          className="w-full mt-4 py-5 shadow-lg hover:scale-102"
          onClick={handleSave}
        >
          Save Order
        </Button>
        <div className="w-full mt-1.5 flex items-center justify-between">
            <Button
          className=" w-[65%] py-5 shadow-lg bg-chart-5 hover:scale-102"
          onClick={openAdd}
        >
          Add
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </Button>
        <Button
          className=" w-[33%] py-5 shadow-lg bg-muted-foreground hover:scale-102"
          onClick={()=>router.push("/workouts")}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </Button>
        </div>
      </div>
      {isOpen &&<DayToast/>}
    </div>
  )
}

export default Page