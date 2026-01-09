import { loadProduct } from '@/actions/products'
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
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Produtos - Clinicas',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { name = '', limit = 15, page = 1, modal, id } = searchParams

  const { data, total } = await loadProduct({ name, limit, page })

  const find = id
    ? (() => {
        const item = data?.find((item) => item.id === id)
        if (!item) return undefined

        return {
          ...item,
        }
      })()
    : undefined

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Produtos</h1>
      <form className="flex flex-row flex-wrap space-x-4">
        <InputLabel
          classHelper="flex-1"
          type="text"
          name="name"
          placeholder="Pesquisar produtos"
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
            Produtos: {formattedPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/products"
          search={{ name: String(name) }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/products"
          search={{ name: String(name) }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/products"
          search={{ name: String(name) }}
        />
        <Pagination.next
          page={+page}
          pathname="/products"
          search={{ name: String(name) }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/products"
          search={{ name: String(name) }}
          orderBy=""
          perPage={+limit}
          totalPage={total}
        />
      </Pagination.root>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>Produtos</span>
            </TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <Link
                  href={{
                    query: { id: item.id, modal: 'true', name, page, limit },
                  }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  <Edit className="mr-1 w-4" />
                  Editar
                </Link>

                <Link
                  href={{
                    query: { id: item.id, modal: 'delete', name, page, limit },
                  }}
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
            Produtos: {formattedPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/products"
          search={{ name: String(name) }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/products"
          search={{ name: String(name) }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/products"
          search={{ name: String(name) }}
        />
        <Pagination.next
          page={+page}
          pathname="/products"
          search={{ name: String(name) }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/products"
          search={{ name: String(name) }}
          orderBy=""
          perPage={+limit}
          totalPage={total}
        />
      </Pagination.root>

      {modal === 'true' && <ModalForm open={true} data={find} />}

      {modal === 'delete' && <ModalDelete open={true} data={find} />}
    </div>
  )
}
