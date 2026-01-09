import { loadServices } from '@/actions/services'
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
import { Edit, PackageSearch, Save, Search, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Procedimentos - Clinicas',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { name = '', limit = 15, page = 1, modal, id } = searchParams

  const result = await loadServices({ name, limit, page })
  const { data, total } = result

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Procedimentos</h1>
      <form className="flex flex-row flex-wrap space-x-4" method="GET">
        <InputLabel
          classHelper="flex-1"
          type="text"
          name="name"
          placeholder="Pesquisar procedimentos..."
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
            Procedimentos: {formattedPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/services"
          search={{ name: String(name) }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/services"
          search={{ name: String(name) }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/services"
          search={{ name: String(name) }}
        />
        <Pagination.next
          page={+page}
          pathname="/services"
          search={{ name: String(name) }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/services"
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
              <span>Procedimentos</span>
              {/* <span className="ml-2 text-xs font-normal">
                Total de cadastros: ({total})
              </span> */}
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
                    pathname: `/services/${item.id}`,
                    query: { name, limit, page },
                  }}
                  className={buttonVariants({
                    variant: 'default-10',
                    size: 'sm',
                  })}
                >
                  <PackageSearch className="mr-1 w-4" />
                  Produtos ({item.total || 0})
                </Link>

                <Link
                  href={{
                    query: { id: item.id, modal: 'true', name, limit, page },
                  }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  <Edit className="mr-1 w-4" />
                  Editar
                </Link>

                <Link
                  href={{
                    query: { id: item.id, modal: 'delete', name, limit, page },
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
            Procedimentos: {formattedPagination(+page, +limit, +total)}
          </span>
          <span className="mx-1 text-xs font-normal">-</span>
          <span className="text-xs font-normal">
            Total de Registros: ({total})
          </span>
        </Pagination.bredcrumb>
        <Pagination.first
          pathname="/services"
          search={{ name: String(name) }}
          orderBy=""
        />
        <Pagination.prev
          page={+page}
          pathname="/services"
          search={{ name: String(name) }}
        />
        <Pagination.links
          page={+page}
          perPage={+limit}
          totalPage={total}
          pathname="/services"
          search={{ name: String(name) }}
        />
        <Pagination.next
          page={+page}
          pathname="/services"
          search={{ name: String(name) }}
          perPage={+limit}
          totalPage={total}
        />
        <Pagination.last
          pathname="/services"
          search={{ name: String(name) }}
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
