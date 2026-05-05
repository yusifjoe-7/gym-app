import type { exercise } from "@/type/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function SortableItem({ exercise }: { exercise: exercise }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between  bg-card rounded-xl p-4 mb-3 shadow-sm border border-border"
    >
      

      <div className="flex-1">
        <p className="font-medium text-sm">{exercise.name}</p>
      </div>
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground touch-none px-1"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <circle cx="5" cy="4" r="1.5"/>
          <circle cx="11" cy="4" r="1.5"/>
          <circle cx="5" cy="8" r="1.5"/>
          <circle cx="11" cy="8" r="1.5"/>
          <circle cx="5" cy="12" r="1.5"/>
          <circle cx="11" cy="12" r="1.5"/>
        </svg>
      </div>
    </div>
  );
}

export default SortableItem