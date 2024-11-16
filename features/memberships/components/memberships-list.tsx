'use client';

import { Edit2, Plus, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import qs from "query-string"

import { Membership, Mentor } from "@prisma/client";

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
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { MembershipWithStudent } from "../actions/get-memberships-list";

interface MembershipsProps {
  memberships: MembershipWithStudent[]
  pagination: PaginationResults
  url: string
}

const MembershipsList = ({
  memberships,
  pagination,
  url: urlPath
}: MembershipsProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter()
  const params = useSearchParams()
  const debouncedValue = useDebounce(search)

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: urlPath,
      query: {
        name: debouncedValue || null,
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
        <Button
          size='sm'
          variant='primary'
          className='flex items-center px-3'
          onClick={() => router.push('/teacher/memberships/new')}>
          <Plus size={15} />
          <span className='pl-2'>Membresia</span>
        </Button>
      </div>
      <Table className='max-h-[50vh]'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Item</TableHead>
            <TableHead className="text-center">Estudiante</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-center">F. Inicio</TableHead>
            <TableHead className="text-center">F. Final</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberships.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-xs text-gray-500 py-40">
                No hay registros
              </TableCell>
            </TableRow>
          )}
          {memberships.map((membership, index) => (
            <TableRow
              key={membership.id + '-' + index}
              className={cn(
                "h-10",
              )}
            >
              <TableCell className="font-medium text-center">
                {(pagination.page - 1) * pagination.sizePage + index + 1}
              </TableCell>
              <TableCell className="text-center">
                {membership.user.name}
              </TableCell>
              <TableCell className="text-center">
                {membership.expiresAt > new Date()
                  ? <Badge variant='published'>Activo</Badge>
                  : <Badge variant='draft'>Inactivo</Badge>}
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(membership.createdAt), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(membership.expiresAt), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell className="text-center">
                <TooltipContainer title='Editar'>
                  <Button
                    variant="link"
                    size='sm'
                    className='text-green-400 px-2'
                    onClick={() => router.push(`/teacher/memberships/${membership.id}/edit`)}>
                    <Edit2 size={15} />
                  </Button>
                </TooltipContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {memberships.length > 0 && (
        <PaginationList result={pagination} path={'/teacher/memberships'} />
      )}
    </>
  );
}

export default MembershipsList;