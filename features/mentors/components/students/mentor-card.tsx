'use client'

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import Image from "next/image";
import { Mentor } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePremium } from "@/hooks/use-premium";
import { Badge } from "@/components/ui/badge";
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import CollapsibleDescription from "@/components/ui/collapsible-description";

interface EventCardProps {
  mentor: Mentor
  isPremium: boolean
}

const MentorCard = ({
  mentor,
  isPremium
}: EventCardProps) => {
  const [SalesPlans, openPlans] = usePremium()

  const router = useRouter()

  const onClick = () => {
    if (!isPremium) {
      openPlans()
    } else {
      router.push(`/events/${mentor.id}`)
    }
  }

  const onClickSocialNetwork = (url: string | null) => {
    if (!url) return
    window.open(url, '_blank')
  }

  return (
    <>
      <Card
        className="max-w-md rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-xl bg-white flex flex-col h-full"
      >
        {mentor.imageUrl && (
          <div className="relative w-full aspect-video rounded-md overflow-auto">
            <Image
              fill
              className="object-cover"
              alt={mentor.name}
              src={mentor.imageUrl}
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="">
            <div className="text-xl font-semibold text-gray-800">
              {mentor.name}
            </div>
            <div className="text-gray-500 text-sm font-normal">
              {mentor.role}
            </div>
            <div className="text-gray-500 text-xs font-normal underline">
              {mentor.email}
            </div>
            <div className="py-3">
              {mentor.linkedinUrl && (
                <LinkedInLogoIcon
                  onClick={() => onClickSocialNetwork(mentor.linkedinUrl)}
                  className="rounded-full w-6 h-6 border-gray-800 cursor-pointer hover:bg-gray-200"
                />
              )}
              {mentor.twitterUrl && (
                <TwitterLogoIcon
                  onClick={() => onClickSocialNetwork(mentor.twitterUrl)}
                  className="rounded-full w-6 h-6 border-gray-800 cursor-pointer hover:bg-gray-200"
                />
              )}
            </div>
          </CardTitle>
          <p className="text-gray-800 text-sm font-semibold">
            Acerca de mi
          </p>
          <CollapsibleDescription
            description={mentor.aboutMe || ''}
          />
        </CardHeader>

        <CardContent className="px-4 pb-4 flex-grow">
          {mentor.specialty.length > 0 && (
            <p className="text-gray-800 text-xs font-semibold mb-1">
              Especialidades
            </p>
          )}
          {mentor.specialty.length > 0 && mentor.specialty.map((specialty) => (
            <Badge
              key={`speciality-${specialty}`}
              className="mr-1 text-xs"
              variant='draft'
            >
              {specialty}
            </Badge>
          ))}

          {mentor.industry.length > 0 && (
            <p className="text-gray-800 text-xs font-semibold mb-1 mt-5">
              Industrias
            </p>
          )}
          {mentor.industry.length > 0 && mentor.industry.map((industry) => (
            <Badge
              key={`industry-${industry}`}
              className="mr-1 text-xs"
              variant='draft'
            >
              {industry}
            </Badge>
          ))}

          {mentor.idioms.length > 0 && (
            <p className="text-gray-800 text-xs font-semibold mb-1 mt-5">
              Idiomas
            </p>
          )}
          {mentor.idioms.length > 0 && mentor.idioms.map((idioms) => (
            <Badge
              key={`idioms-${idioms}`}
              className="mr-1 text-xs"
              variant='draft'
            >
              {idioms}
            </Badge>
          ))}

        </CardContent>
        <CardFooter className="p-4 bg-gray-50 mt-auto">
          <Button
            onClick={onClick}
            variant='premium'
            className="w-full"
          >
            Agendar una reunion
          </Button>
        </CardFooter>
      </Card>
      <SalesPlans />
    </>
  );
};

export default MentorCard;