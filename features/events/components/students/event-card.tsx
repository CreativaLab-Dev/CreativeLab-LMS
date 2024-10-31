'use client'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import EventGoogleMap from "../event-google-map";
import { usePremium } from "@/hooks/use-premium";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";

const typeTextMap = {
  VIRTUAL: 'Virtual',
  PRESENTIAL: 'Presencial',
  VIRTUAL_AND_PRESENTIAL: 'Virtual y Presencial'
}

interface EventCardProps {
  event: Event
  isPremium: boolean
}

const EventCard = ({
  event,
  isPremium
}: EventCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [SalesPlans, openPlans] = usePremium()

  const router = useRouter()

  const onClick = () => {
    if (!isPremium) {
      openPlans()
    } else {
      router.push(`/events/${event.id}`)
    }
  }

  const typeText = typeTextMap[typeof event.type === 'string' ? event.type : 'VIRTUAL']
  return (
    <>
      <Card
        className="max-w-md rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-white flex flex-col h-full"
      >
        {event.imageUrl && (
          <div className="relative w-full aspect-video rounded-md overflow-auto">
            <Image
              fill
              className="object-cover"
              alt={event.title}
              src={event.imageUrl}
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {event.title}
          </CardTitle>
          <div className="flex flex-col gap-3">
            <div>
              {event.date ? format(new Date(event.date), 'PPP', { locale: es }) : 'Fecha por definir'}
            </div>
            {event.organizer && (
              <div className="text-xs" >
                Organizador por: {event.organizer}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 flex-grow">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full 1space-y-2"
          >
            {!isOpen && (
              <p className="text-gray-700 text-sm">
                {event.description?.slice(0, 100)}
                {event.description && event.description.length > 100 && '...'}
              </p>
            )}
            <CollapsibleContent className="space-y-2">
              <p className="text-gray-700 text-sm">
                {event.description}
              </p>
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              {event.description && event.description.length > 100 && (
                <button className="text-blue-600 hover:underline text-xs">
                  {isOpen ? 'Ver menos' : 'Ver más'}
                </button>
              )}

            </CollapsibleTrigger>


          </Collapsible>

          {event.type && (
            <>
              <Badge className="mt-3">
                {typeText}
              </Badge>
              {isPremium && event.link && <>
                <p className="text-sm text-gray-500 mt-3">
                  <span className="font-semibold">Enlace:</span>
                </p>
                <a
                  className="text-blue-600 hover:underline text-xs"
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.link}
                </a>
              </>}
              {isPremium && event.location && (
                <>
                  <p className="text-sm text-gray-500 mt-3">
                    <span className="font-semibold">Ubicación:</span>
                  </p>
                  <EventGoogleMap url={event.location} />
                </>
              )}

              {isPremium && event.maxCapacity && (
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-semibold">Capacidad Máxima:</span> {event.maxCapacity} personas
                </p>
              )}
            </>
          )}

        </CardContent>
        <CardFooter className="p-4 bg-gray-50 mt-auto">
          <Button
            onClick={onClick}
            variant='premium'
            className="w-full"
          >
            Reserva tu lugar
          </Button>
        </CardFooter>
      </Card>
      <SalesPlans />
    </>
  );
};

export default EventCard;