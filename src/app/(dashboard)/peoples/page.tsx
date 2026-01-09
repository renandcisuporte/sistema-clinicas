import { loadPeoples } from '@/actions/peoples'
import { InputLabel } from '@/components/common/input'
import { Pagination } from '@/components/common/pagination'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/libs/cn'
import { formattedPagination } from '@/libs/utils'
import { SearchParamsProps } from '@/types/common'
import { Edit, Save, Search, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { SwitchPeople } from './components/switch-people'
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Pessoas - Clinicas',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { full_name = '', limit = 15, page = 1, modal, id } = searchParams

  const { data, total } = await loadPeoples({
    full_name,
    limit,
    page,
  })

  const people = id
    ? (() => {
        const item = data?.find((item) => item.id === id)
        if (!item) return undefined

        return {
          ...item,
          phones: JSON.parse(item.phones!),
          dateOfBirth: item.dateOfBirth ? item.dateOfBirth.toISOString() : null,
        }
      })()
    : undefined

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Pessoas</h1>
      <form className="flex flex-row flex-wrap space-x-4">
        <InputLabel
          classHelper="flex-1"
          type="text"
          name="full_name"
          placeholder="Pesquisar salas"
        />

        <Button type="submit" size="sm">
          <Search className="mr-1 w-4" />
          Pesquisar
        </Button>
        <Link
          href={{ query: { modal: 'true' } }}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          <Save className="mr-1 w-4" />
          Cadastrar
        </Link>
      </form>

      <Pagination.root>
        <Pagination.bredcrumb>
          <span className="text-xs font-normal">
            Pessoas: {formattedPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
        />
        <Pagination.next
          page={+page}
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
          orderBy=""
          perPage={+limit}
          totalPage={total}
        />
      </Pagination.root>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>Pessoas</span>
            </TableHead>
            <TableHead>Ativo/Inativo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.fullName}</TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <SwitchPeople
                  active={item.type as 'specialist' | 'user'}
                  id={item.id!}
                />
              </TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <Link
                  href={{ query: { id: item.id, modal: 'true' } }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  <Edit className="mr-1 w-4" />
                  Editar
                </Link>

                <Link
                  href={{ query: { id: item.id, modal: 'delete' } }}
                  className={buttonVariants({
                    variant: 'destructive',
                    size: 'sm',
                  })}
                >
                  <Trash className="mr-1 w-4" />
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination.root>
        <Pagination.bredcrumb>
          <span className="text-xs font-normal">
            Pessoas: {formattedPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
        />
        <Pagination.next
          page={+page}
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/peoples"
          search={{ full_name: String(full_name) }}
          orderBy=""
          perPage={+limit}
          totalPage={total}
        />
      </Pagination.root>

      {modal === 'true' && <ModalForm open={true} data={people} />}

      {modal === 'delete' && <ModalDelete open={true} data={people} />}
    </div>
  )
}
