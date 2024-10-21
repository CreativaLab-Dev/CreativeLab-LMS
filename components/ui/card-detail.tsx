'use client'

import { Course } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import CourseDetail from "@/features/courses/components/course-detail";
import CourseContentList from "@/features/courses/components/course-content-list";

interface CardDetailProps {
  course: Course
}

const CardDetail = ({ course }: CardDetailProps) => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Informacion</TabsTrigger>
        <TabsTrigger value="password">Contenido</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <CourseDetail course={course} />
      </TabsContent>
      <TabsContent value="password">
        <CourseContentList />
      </TabsContent>
    </Tabs>

  );
}

export default CardDetail;