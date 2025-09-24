import { loadExpenses } from '@/app/_actions/expenses'
import { InputLabel } from '@/app/_components/common/input'
import { Pagination } from '@/app/_components/common/pagination'
import { Button, buttonVariants } from '@/app/_components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { cn, formatPagination } from '@/app/_lib/utils'
import { SearchParamsProps } from '@/app/_types/common'
import { Edit, Save, Search, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { SwitchExpense } from './_components/switch-expense'
import { TypeExpense } from './_components/type-expense'
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Despesas - Clinicas',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const {
    description = '',
    type = '',
    active = '',
    limit = 15,
    page = 1,
    modal,
    id,
  } = searchParams

  const {
    data,
    total,
    fixed,
    variable,
    active: totalActive,
    inative,
    errorMessage,
  } = await loadExpenses({
    description: String(description),
    type,
    active,
    limit,
    page,
  })

  return (
    <div className="flex flex-col space-y-4">
      {errorMessage && (
        <div className="rounded-lg bg-amber-100/50 p-6 font-semibold text-amber-600">
          {errorMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold">Despesas</h1>
      <form className="flex flex-row flex-wrap space-x-4">
        <InputLabel
          classHelper="flex-1"
          type="text"
          name="description"
          placeholder="Pesquisar..."
        />

        <Select name="active" defaultValue={String(active || 'all')}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Ativo/Inativo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Ativos</SelectItem>
            <SelectItem value="false">Inativos</SelectItem>
          </SelectContent>
        </Select>

        <Select name="type" defaultValue={String(type || 'all')}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Renda Fixa/Variável" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="fixed">Renda Fixa</SelectItem>
            <SelectItem value="variable">Renda Variável</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit">
          <Search className="mr-1 w-4" />
          Pesquisar
        </Button>
        <Link
          href={{ query: { modal: 'true' } }}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Save className="mr-1 w-4" />
          Cadastrar
        </Link>
      </form>

      <Pagination.root>
        <Pagination.bredcrumb>
          <span className="text-xs font-normal">Fixas: ({fixed})</span>
          <span className="ml-2 text-xs font-normal">
            Variáveis: ({variable})
          </span>
          <span className="ml-2 text-xs font-normal">
            Ativas: ({totalActive})
          </span>
          <span className="ml-2 text-xs font-normal">
            Inativas: ({inative})
          </span>
          <span className="ml-2 text-xs font-normal">
            Desepesas: {formatPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
        />
        <Pagination.next
          page={+page}
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
          orderBy=""
          perPage={+limit}
          totalPage={total}
        />
      </Pagination.root>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>Descrição</span>
            </TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead>Ativo/Inativo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <TypeExpense type={item.type} id={item.id!} />
              </TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <SwitchExpense active={item.active === true} id={item.id!} />
              </TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <Link
                  href={{
                    query: {
                      id: item.id,
                      modal: 'true',
                      page,
                      limit,
                      type,
                      active,
                      description,
                    },
                  }}
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
          <span className="text-xs font-normal">Fixas: ({fixed})</span>
          <span className="ml-2 text-xs font-normal">
            Variáveis: ({variable})
          </span>
          <span className="ml-2 text-xs font-normal">
            Ativas: ({totalActive})
          </span>
          <span className="ml-2 text-xs font-normal">
            Inativas: ({inative})
          </span>
          <span className="ml-2 text-xs font-normal">
            Desepesas: {formatPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
        />
        <Pagination.next
          page={+page}
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/expenses"
          search={{
            description: String(description),
            type: String(type),
            active: String(active),
          }}
          orderBy=""
          perPage={+limit}
          totalPage={total}
        />
      </Pagination.root>

      <ModalForm
        open={modal === 'true'}
        data={data?.find((item) => item.id === id)}
      />

      <ModalDelete
        open={modal === 'delete'}
        data={data?.find((item) => item.id === id)}
      />
    </div>
  )
}
