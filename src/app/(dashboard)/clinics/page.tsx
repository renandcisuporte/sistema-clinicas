import { loadClinics } from '@/actions/clinics'
import { InputLabel } from '@/components/common/input'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/libs/cn'
import { SearchParamsProps } from '@/types/common'
import { Edit, Save, Search, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ModalDelete } from './components/modal-delete'

export const metadata: Metadata = {
  title: 'Lista de Clinicas - Clinicas',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { title, cnpj, limit = 15, page = 1, modal, id } = searchParams

  const clinic = await loadClinics({ title, cnpj, limit, page })

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Clinicas</h1>
      <form className="flex flex-row flex-wrap space-x-4">
        <InputLabel
          label="Clinicas"
          className="flex-1"
          type="text"
          name="title"
          placeholder="Pesquisa nome da clinica"
        />
        <InputLabel
          label="CNPJ"
          className="flex-1"
          type="text"
          name="cnpj"
          placeholder="Pesquise pelo CNPJ"
        />
        <Button type="submit" className="mt-5" size="sm">
          <Search className="mr-1 w-4" />
          Pesquisar
        </Button>
        <Link
          href="/clinics/create"
          className={cn(
            'mt-5',
            buttonVariants({ variant: 'outline', size: 'sm' }),
          )}
        >
          <Save className="mr-1 w-4" />
          Cadastrar
        </Link>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Clinica</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Salas</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clinic.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.fantasy}</TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                {item.cnpj}
              </TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                0
              </TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <Link
                  href={`/clinics/${item.id}/update`}
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex flex-row flex-wrap items-center justify-end space-x-4">
                <span>PAGINAÇÃO:</span>
                <Link
                  href={{
                    query: {
                      page: Number(page) - 1 == 0 ? 1 : Number(page) - 1,
                      limit,
                      title,
                      cnpj,
                    },
                  }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Anterior
                </Link>
                <span>{page}</span>
                <Link
                  href={{
                    query: {
                      page:
                        clinic.data?.length === Number(limit)
                          ? Number(page) + 1
                          : page,
                      limit,
                      title,
                      cnpj,
                    },
                  }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Próxima
                </Link>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {modal === 'delete' && (
        <ModalDelete
          open={true}
          clinicId={clinic.data?.find((item) => item.id === id)?.id}
        />
      )}
    </div>
  )
}
