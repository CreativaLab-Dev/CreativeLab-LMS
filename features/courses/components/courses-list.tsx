'use client';

import { Edit2, Menu, Plus, Search, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
import { PaginationList } from "@/components/ui/pagination-list";

interface CourseProps {
  courses: Course[]
}

const CoursesList = ({ courses }: CourseProps) => {
  const router = useRouter()
  const params = useSearchParams()

  const [ConfirmRemoveCourse, confirmRemoveCourse] = useConfirm(
    'Eliminar requerimiento',
    '¿Estas seguro de eliminar este requerimiento?')

  const onDeleteCourse = async (id: string) => {
    const ok = await confirmRemoveCourse()
    if (!ok) {
      return
    }
    fetch(`/api/v1/requirements/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // toast.success("Requerimiento eliminado");
      router.replace('/requirements')
    }).catch((error) => {
      // toast.error("Error eliminando requerimiento");
      console.log('Error deleting requirement', error)
    })
  }

  const onFilter = (e: any) => {
    const value = e.target.value;
    const url = qs.stringifyUrl({
      url: '/courses',
      query: {
        search: value || null,
        page: Number(params.get('page') ?? 1),
        sizePage: Number(params.get('sizePage') ?? 100)
      }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
  }

  useEffect(() => {
    onFilter({ target: { value: params.get('search') } })
  }, [])
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar..."
              onChange={onFilter}
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
          onClick={() => router.push('/courses/new')}>
          <Plus size={15} />
          <span className='pl-2'>Curso</span>
        </Button>
      </div>
      <Table className='max-h-[50vh]'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Item</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={course.id + '-' + index}>
              <TableCell className="font-medium text-center">
                {/* {(pagination.page - 1) * pagination.sizePage + index + 1} */}
                {index + 1}
              </TableCell>
              <TableCell className="text-center">
                {course.name}
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
                    onClick={() => router.push(`/courses/${course.id}/edit`)}>
                    <Edit2 size={15} />
                  </Button>
                </TooltipContainer>
                <TooltipContainer title='Ver detalles'>
                  <Button
                    variant="link"
                    size='sm'
                    className='text-blue-400 px-2'
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
      <PaginationList result={{ page: 1, sizePage: 100, total: 1 }} path={'/courses'} />
      <ConfirmRemoveCourse />
    </>
  );
}

export default CoursesList;