'use client'

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleDescriptionProps {
  description: string
}

const CollapsibleDescription = ({
  description
}: CollapsibleDescriptionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full 1space-y-2"
    >
      {!isOpen && (
        <p className="text-gray-700 text-sm">
          {description?.slice(0, 100)}
          {description && description.length > 100 && '...'}
        </p>
      )}
      <CollapsibleContent
        className="space-y-2">
        <p className="text-gray-700 text-sm">
          {description}
        </p>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        {description && description.length > 100 && (
          <button className="text-blue-600 hover:underline text-xs">
            {isOpen ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </CollapsibleTrigger>
    </Collapsible>
  );
}

export default CollapsibleDescription;