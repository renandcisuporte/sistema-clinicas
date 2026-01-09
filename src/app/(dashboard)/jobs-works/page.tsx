import { findClinics } from '@/actions/clinics'
import { saveWorkTime, saveWorkTimeRecommended } from '@/actions/work-times'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/libs/cn'
import { getUser } from '@/libs/session'
import { SearchParamsProps } from '@/types/common'
import { Clock } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { ModalJobWork } from './components/modal-jobs-works'
import { ModalJobWorkAverageTime } from './components/modal-jobs-works-average-time'

export default async function Page({ searchParams }: SearchParamsProps) {
  const { modal } = searchParams

  const session = await getUser()
  if (!session) return redirect('/login')

  const { clinicId } = session
  const { data } = await findClinics(clinicId)

  const payload = {
    id: data.id ?? '',
    clinicId: data.clinicId ?? null,
    number: data.number ?? null,
    title: data.title ?? '',
    fantasy: data.fantasy ?? '',
    cnpj: data.cnpj ?? '',
    ie: data.ie ?? '',
    phone: data.phone ?? null,
    mobilePhone: data.mobilePhone ?? null,
    averageService: data.averageService ?? null,
    address: data.address ?? null,
    neighborhood: data.neighborhood ?? null,
    complement: data.complement ?? null,
    reference: data.reference ?? null,
    city: data.city ?? null,
    state: data.state ?? null,
    zipCode: data.zipCode ?? null,
  }

  return (
    <div className="flex flex-col flex-wrap space-y-4 md:flex-row">
      <div className="mb-4 flex w-full flex-row items-center justify-between border-b border-neutral-300 pb-4">
        <h2 className="text-xl">Clinica - {data?.title}</h2>
      </div>

      <Link
        href={{
          pathname: `/jobs-works`,
          query: {
            clinicId,
            modal: 'work_times',
          },
        }}
        className={cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'mr-4',
        )}
        type="button"
      >
        <Clock className="mr-1 w-4" />
        Horário de Funcionamento
      </Link>
      <Link
        href={{
          pathname: `/jobs-works`,
          query: {
            clinicId,
            modal: 'work_times_recommended',
          },
        }}
        className={cn(
          buttonVariants({ variant: 'destructive', size: 'lg' }),
          'mr-4',
        )}
        type="button"
      >
        <Clock className="mr-1 w-4" />
        Horário Recomendado
      </Link>

      <Link
        href={{
          pathname: `/jobs-works`,
          query: {
            clinicId,
            modal: 'average_times_service',
          },
        }}
        className={cn(
          buttonVariants({ variant: 'default-10', size: 'lg' }),
          'mr-4',
        )}
        type="button"
      >
        <Clock className="mr-1 w-4" />
        Tempo médio de atendimento
      </Link>

      {modal === 'work_times' && (
        <ModalJobWork
          open={true}
          input={data?.workTimes}
          action={saveWorkTime}
          title="Horário de Funcionamento"
        />
      )}

      {modal === 'work_times_recommended' && (
        <ModalJobWork
          open={true}
          input={data?.workTimesRecommended}
          action={saveWorkTimeRecommended}
          title="Horário Recomendado"
        />
      )}

      {modal === 'average_times_service' && (
        <ModalJobWorkAverageTime open={true} input={payload} />
      )}
    </div>
  )
}
