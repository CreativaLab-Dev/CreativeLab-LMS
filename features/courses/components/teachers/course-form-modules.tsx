'use client'

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"

import { cn } from "@/lib/utils"
import { Grid, Pencil } from "lucide-react";

interface ChapterListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string, position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({
  items,
  onReorder,
  onEdit
}: ChapterListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIdex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIdex, endIndex + 1)
    setChapters(items);

    const bulkUpdatedData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }));

    onReorder(bulkUpdatedData);
  }

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 border rounded-md mb-4 text-sm bg-slate-100 border-slate-200 text-slate-700",
                      chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-600"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-sky-200 hover:bg-sky-300 rounded-l-md transition"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grid className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="h-4 w-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ChaptersList;