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
import EventGoogleMap from "../event-google-map";
import { usePremium } from "@/hooks/use-premium";
import { Badge } from "@/components/ui/badge";
import CollapsibleDescription from "@/components/ui/collapsible-description";

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
  const [SalesPlans, openPlans] = usePremium()

  const onClick = () => {
    if (!isPremium) {
      openPlans()
    } else {
      window.open(event.externalLink ?? '', '_blank')
    }
  }

  const typeText = typeTextMap[typeof event.type === 'string' ? event.type : 'VIRTUAL']
  return (
    <>
      <Card
        className="group max-w-md rounded-lg overflow-hidden border border-gray-200 transition group-hover:shadow-sm hover:border-blue-400 bg-white flex flex-col h-full"
      >
        <div className="p-3">
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
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500">
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
          <CollapsibleDescription
            description={event.description || ''}
          />
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
            Agregar al calendario
          </Button>
        </CardFooter>
      </Card>
      <SalesPlans />
    </>
  );
};

export default EventCard;