import { LogOut } from '@/components/common/button-others'
import * as Nav from '@/components/common/link'
import { cn } from '@/libs/cn'
import { getUser } from '@/libs/session'

import {
  ChartNoAxesGantt,
  ChartSpline,
  Clock,
  Equal,
  Gauge,
  Hospital,
  PackageSearch,
  Stethoscope,
  TrendingUp,
  User,
  UserPen,
  UsersRound,
} from 'lucide-react'

import Image from 'next/image'
import { redirect } from 'next/navigation'

type ChildrenProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: ChildrenProps) {
  const sessionUser = await getUser()
  if (!sessionUser) return redirect('/login')

  const { user, clinicId } = sessionUser

  return (
    <main className="flex h-full flex-col bg-neutral-100 md:flex-row">
      <div
        className={cn(
          'sticky left-0 top-0 flex h-16 w-full items-center bg-neutral-800 md:h-screen md:max-w-64 md:flex-col md:items-start',
          'bg-default',
        )}
      >
        <span className="relative flex h-16 w-full items-center justify-center border-b-4 border-white bg-white">
          <Image
            alt="Logo"
            src="/RUBRICA-SISTEMA.png"
            className="object-contain"
            quality={100}
            width={200}
            height={50}
          />
        </span>
        {/* NAVIGATION */}
        <nav
          className={cn(
            // nav
            'mt-6 w-full flex-1 divide-y divide-default overflow-y-auto overscroll-none border-transparent md:h-screen md:max-w-64',

            // nav > a
            '[&>a]:relative [&>a]:block [&>a]:h-16 [&>a]:w-full [&>a]:flex-wrap [&>a]:items-center [&>a]:space-x-2 [&>a]:bg-default-dark [&>a]:px-4 [&>a]:text-white hover:[&>a]:bg-neutral-100 hover:[&>a]:text-black',

            // nav > a > span
            '[&>a>span]:flex [&>a>span]:h-16 [&>a>span]:items-center [&>a>span]:space-x-1',

            // nav > div
            '[&>div]:relative [&>div]:h-auto [&>div]:w-full [&>div]:cursor-pointer [&>div]:flex-col [&>div]:items-center [&>div]:bg-default-dark [&>div]:text-white hover:[&>div]:bg-neutral-100 hover:[&>div]:text-black',

            // nav > div > span
            '[&>div>span]:flex [&>div>span]:h-16 [&>div>span]:items-center [&>div>span]:space-x-1 [&>div>span]:px-4',

            // nav > div > div
            '[&>div>div[data-open=true]]:block [&>div>div]:-mt-[1px] [&>div>div]:hidden [&>div>div]:min-h-16 [&>div>div]:w-full [&>div>div]:flex-1 [&>div>div]:cursor-pointer [&>div>div]:items-center [&>div>div]:border-l-[1em] [&>div>div]:border-l-default [&>div>div]:text-white',

            // nav > div > div > a
            // '[&>div>div>a]:text-sm [&>div>div>a]:flex [&>div>div>a]:items-center [&>div>div>a]:px-4 [&>div>div>a]:h-16 [&>div>div]:w-full',

            // nav > div > div > a
            '[&>div>div>a]:relative [&>div>div>a]:block [&>div>div>a]:h-16 [&>div>div>a]:w-full [&>div>div>a]:flex-wrap [&>div>div>a]:items-center [&>div>div>a]:space-x-2 [&>div>div>a]:bg-default [&>div>div>a]:px-4 [&>div>div>a]:text-sm [&>div>div>a]:text-white hover:[&>div>div>a]:bg-neutral-100 hover:[&>div>div>a]:text-black', // nav > a

            // nav > div > div > a > span
            '[&>div>div>a>span]:flex [&>div>div>a>span]:h-16 [&>div>div>a>span]:items-center [&>div>div>a>span]:space-x-1', // nav > a > span
          )}
        >
          <Nav.Link href="/dashboard">
            <span>
              <Gauge />
              <span>Dashboard</span>
            </span>
          </Nav.Link>

          <Nav.LinkDropDown data-href={['/releases']} label="Lançamentos">
            <Nav.Link href="/releases/fixed">
              <span>
                <Clock className="h-6 w-6" />
                <span>Despesas Fixas</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/releases/variable">
              <span>
                <Clock className="h-6 w-6" />
                <span>Despesas Variáveis</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>

          <Nav.LinkDropDown
            data-href={['/clinics', '/jobs-works', '/rooms']}
            label="Administrativo"
          >
            <Nav.Link href={`/clinics/${clinicId}/update`}>
              <span>
                <Hospital className="h-6 w-6" />
                <span>Dados da Clínica</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/jobs-works">
              <span>
                <Clock className="h-6 w-6" />
                <span>Horários de Trabalho</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/rooms">
              <span>
                <Stethoscope className="h-6 w-6" />
                <span>Espaços Terapeutico</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>

          <Nav.LinkDropDown
            data-href={['/peoples', '/expenses', '/services', '/products']}
            label="Cadastros"
          >
            <Nav.Link href="/products">
              <span>
                <PackageSearch className="h-6 w-6" />
                <span>Produtos</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/services">
              <span>
                <ChartNoAxesGantt className="h-6 w-6" />
                <span>Procedimentos</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/peoples">
              <span>
                <UsersRound className="h-6 w-6" />
                <span>Pessoas</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/expenses">
              <span>
                <Equal className="h-6 w-6" />
                <span>Despesas</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>

          <Nav.LinkDropDown
            data-href={['/operational-capacity']}
            label="Gráficos"
          >
            <Nav.Link href="/operational-capacity">
              <span>
                <TrendingUp className="h-6 w-6" />
                <span>Capacidade Operacional</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/operational-expense">
              <span>
                <TrendingUp className="h-6 w-6" />
                <span>Despesas</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>

          <Nav.LinkDropDown
            data-href={['/report-product', '/report-procediment']}
            label="Relatórios"
          >
            <Nav.Link href="/report-product">
              <span>
                <ChartSpline className="h-6 w-6" />
                <span>Relatório de Produtos</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/report-procediment">
              <span>
                <ChartSpline className="h-6 w-6" />
                <span>Relatório de Procedimentos</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/report-expense">
              <span>
                <ChartSpline className="h-6 w-6" />
                <span>Relatório de Despesas</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>
        </nav>
        {/* END NAVIGATION */}
        <Image
          src="/rubrica.png"
          alt=""
          width="170"
          height="50"
          className="m-4 mx-auto"
        />
      </div>
      <section className="flex-1 p-4">
        <div
          className={cn(
            'sticky left-0 top-0 -mx-4 -mt-4 flex h-16 justify-between shadow-lg',
            'z-50 border-default bg-default',
          )}
        >
          <aside className="flex-1 px-4"></aside>
          <aside
            className={cn(
              'relative flex h-16 min-w-36 cursor-pointer flex-wrap items-center space-x-1 bg-white px-4',
              '[&>div]:absolute [&>div]:right-0 [&>div]:top-[100%] [&>div]:hidden [&>div]:w-56 [&>div]:flex-col [&>div]:bg-white [&>div]:p-4 [&>div]:shadow-lg [&>div]:hover:block',
              '[&>div>span]:my-4 [&>div>span]:flex [&>div>span]:space-x-1',
            )}
          >
            <User />{' '}
            <span className="uppercase">
              Olá {user?.fullName?.split(' ')[0]}
            </span>
            <div>
              <span>
                <UserPen /> <span>Meus Dados</span>
              </span>
              <hr className="divide-y-0" />
              <LogOut />
            </div>
          </aside>
        </div>
        <div className="mt-6 rounded-lg bg-white p-4 shadow-lg">{children}</div>
      </section>
    </main>
  )
}
