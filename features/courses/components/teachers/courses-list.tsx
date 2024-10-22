'use client';

import { Edit2, Menu, Plus, Search, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import qs from "query-string"

import { useConfirm } from "@/hooks/use-confirm";
import { Course } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import TooltipContainer from "@/components/ui/tooltip-container";
import { PaginationList, PaginationResults } from "@/components/ui/pagination-list";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";

interface CourseProps {
  courses: Course[]
  pagination: PaginationResults
}

const CoursesList = ({ courses, pagination }: CourseProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter()
  const params = useSearchParams()
  const debouncedValue = useDebounce(search)

  const [ConfirmRemoveCourse, confirmRemoveCourse] = useConfirm(
    'Eliminar curso',
    '¿Estas seguro de eliminar este curso?')

  const onDeleteCourse = async (id: string) => {
    const ok = await confirmRemoveCourse()
    // Todo: Implement delete course
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: '/teacher/courses',
      query: {
        search: debouncedValue || null,
        page: Number(params.get('page') ?? 1),
        sizePage: Number(params.get('sizePage') ?? 10)
      }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
  }, [debouncedValue, router])
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar..."
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 py-1 border rounded w-full"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Search size={16} />
            </span>
          </div>
        </div>
        <Button variant="default"
          size='sm'
          className='flex items-center px-3'
          onClick={() => router.push('/teacher/courses/new')}>
          <Plus size={15} />
          <span className='pl-2'>Curso</span>
        </Button>
      </div>
      <Table className='max-h-[50vh]'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Item</TableHead>
            <TableHead className="text-center">Miniatura</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Nuevo</TableHead>
            <TableHead className="text-center">Principal</TableHead>
            <TableHead className="text-center">Fecha C.</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={course.id + '-' + index} className="h-24 md:h-52">
              <TableCell className="font-medium text-center">
                {(pagination.page - 1) * pagination.sizePage + index + 1}
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <div className="w-36 h-24 md:w-80 md:h-44 relative cursor-pointer hover:scale-105 transform transition-transform"
                  onClick={() => router.push(`/teacher/courses/${course.id}/edit`)}
                >
                  <Image
                    src={course.imagePath || '/placeholder.png'}
                    alt={course.name}
                    objectFit="cover"
                    fill
                    className='rounded' />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                    <span className="text-white text-sm">Ver</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {course.name}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={course.isNew ? 'default' : 'destructive'}>
                  {course.isNew ? 'Si' : 'No'}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={course.isFeatured ? 'default' : 'destructive'}>
                  {course.isNew ? 'Si' : 'No'}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {
                  format(new Date(course.createdAt), 'dd/MM/yyyy')
                }
              </TableCell>
              <TableCell className="text-center">
                <TooltipContainer title='Editar'>
                  <Button
                    variant="link"
                    size='sm'
                    className='text-green-400 px-2'
                    onClick={() => router.push(`/teacher/courses/${course.id}/edit`)}>
                    <Edit2 size={15} />
                  </Button>
                </TooltipContainer>
                <TooltipContainer title='Ver detalles'>
                  <Button
                    variant="link"
                    size='sm'
                    className='text-blue-400 px-2'
                    onClick={() => router.push(`/teacher/courses/${course.id}/detail`)}
                  >
                    <Menu size={15} />
                  </Button>
                </TooltipContainer>
                <TooltipContainer title='Eliminar'>
                  <Button
                    variant="link"
                    size='sm'
                    className='text-red-400 px-2'
                    onClick={() => onDeleteCourse(course.id)}>
                    <Trash2 size={15} />
                  </Button>
                </TooltipContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationList result={pagination} path={'/courses'} />
      <ConfirmRemoveCourse />
    </>
  );
}

export default CoursesList;