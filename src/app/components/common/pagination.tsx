import { cn } from '@/libs/cn'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

type CommonProps = React.HTMLAttributes<HTMLDivElement>

type PaginationProps = {
  search?: {
    [k: string]: string
  }
  orderBy?: string
  page: number
  perPage: number
  totalPage: number
  pathname: string
}

const Links = ({
  pathname,
  perPage,
  totalPage,
  page,
  search,
  orderBy,
}: PaginationProps) => {
  const visibleLinks = 5 // Número máximo de links visíveis
  const half = Math.floor(visibleLinks / 2)
  const totalPages = Math.ceil(totalPage / +perPage)

  // Calcula o início e o fim da janela
  let start = Math.max(1, +page - half)
  let end = Math.min(totalPages, +page + half)

  // Ajusta para garantir que sempre mostre o número correto de links
  if (end - start + 1 < visibleLinks) {
    if (start === 1) {
      end = Math.min(totalPages, start + visibleLinks - 1)
    } else if (end === totalPage) {
      start = Math.max(1, end - visibleLinks + 1)
    }
  }

  return (
    <>
      {/* Links visíveis */}
      {Array.from({ length: end - start + 1 }).map((_, index) => {
        const pageIndex = start + index
        const isActive =
          +page === pageIndex
            ? 'bg-default text-white hover:bg-default hover:text-white'
            : 'hover:bg-default hover:text-white'

        return (
          <Link
            key={pageIndex}
            href={{ pathname, query: { page: pageIndex, orderBy, ...search } }}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              isActive,
            )}
          >
            {pageIndex}
          </Link>
        )
      })}
    </>
  )
}

const Prev = ({
  page,
  pathname,
  search,
  orderBy,
}: Pick<PaginationProps, 'page' | 'pathname' | 'search' | 'orderBy'>) =>
  page > 1 && (
    <Link
      href={{ pathname, query: { page: page - 1, orderBy, ...search } }}
      className={buttonVariants({ variant: 'outline', size: 'sm' })}
    >
      &laquo;
    </Link>
  )

const Next = ({
  page,
  pathname,
  totalPage,
  search,
  orderBy,
  perPage = 5,
}: Pick<
  PaginationProps,
  'page' | 'pathname' | 'totalPage' | 'search' | 'orderBy' | 'perPage'
>) => {
  const totalPages = Math.ceil(totalPage / +perPage)
  return (
    page < totalPages && (
      <Link
        href={{ pathname, query: { page: page + 1, orderBy, ...search } }}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        &raquo;
      </Link>
    )
  )
}

const First = ({
  pathname,
  search,
  orderBy,
}: Pick<PaginationProps, 'pathname' | 'search' | 'orderBy'>) => (
  <Link
    href={{ pathname, query: { page: 1, orderBy, ...search } }}
    className={buttonVariants({ variant: 'outline', size: 'sm' })}
  >
    &laquo; Primeira
  </Link>
)

const Last = ({
  pathname,
  search,
  orderBy,
  totalPage,
  perPage,
}: Pick<
  PaginationProps,
  'pathname' | 'search' | 'orderBy' | 'totalPage' | 'perPage'
>) => (
  <Link
    href={{
      pathname,
      query: { page: Math.ceil(totalPage / perPage), orderBy, ...search },
    }}
    className={buttonVariants({ variant: 'outline', size: 'sm' })}
  >
    Última &raquo;
  </Link>
)

const Bredcrumb = ({ children }: CommonProps) => {
  return (
    <div className="flex flex-1 flex-row flex-wrap items-center justify-start">
      {children}
    </div>
  )
}

const Root = ({ children }: CommonProps) => {
  return (
    <div className="mt-5 flex flex-row flex-wrap items-center justify-end space-x-2">
      {children}
    </div>
  )
}

export const Pagination = {
  root: Root,
  bredcrumb: Bredcrumb,
  first: First,
  last: Last,
  links: Links,
  prev: Prev,
  next: Next,
}
