import { findClinics } from '@/actions/clinics'
import { notFound } from 'next/navigation'
import { ModalWorkTimes } from '../components/modal-worktimes'
import { ModalWorkTimesRecommended } from '../components/modal-worktimes-recommended'
import { PageClient } from './page-client'

export type ParamsProps = {
  params: { page: string | string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: ParamsProps) {
  const { page } = params
  const { modal } = searchParams

  const pathUri = page[page.length - 1]

  switch (pathUri) {
    case 'update':
      const { data } = await findClinics(params?.page[0])

      if (!data?.id) return notFound()

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
        <>
          <PageClient input={payload} />

          {modal === 'work_times' && (
            <ModalWorkTimes
              open={modal === 'work_times'}
              input={data?.workTimes}
            />
          )}

          {modal === 'work_times_recommended' && (
            <ModalWorkTimesRecommended
              open={modal === 'work_times_recommended'}
              input={data?.workTimesRecommended}
            />
          )}
        </>
      )
    case 'create':
      return <PageClient />
    default:
      return <div>Não autorizado no momento!</div>
  }
}
