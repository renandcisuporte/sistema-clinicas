'use client'

import { ButtonSubmit } from '@/components/common/button-submit'
import * as CtxMenu from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import * as Table from '@/components/ui/table'
import { mockMonths, month } from '@/contants'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/libs/cn'
import { formatPrice, maskPrice } from '@/libs/mask'
import { formatteRealeses } from '@/libs/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { actionRelease } from '../[expenses]/action'
import {
  FormProps,
  RealeseFormData,
  Realeses,
  realeseSchema,
} from '../[expenses]/types'

export function FormExpenseFixedClient({ expenses, realeses }: FormProps) {
  const [allRealeses, setAllReleases] = useState<Realeses>({})

  const form = useForm<RealeseFormData>({
    resolver: zodResolver(realeseSchema),
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (formData: RealeseFormData) => {
    try {
      await actionRelease(formData)
    } catch (error) {
      console.log('[FORMEXPENSEFIXEDCLIENT] Error: ', error)
      toast({
        title: 'Erro ao salvar lançamentos!',
        description: (error as any)?.message,
      })
    }
  }

  useEffect(() => {
    if (!expenses || !realeses) return

    const updatedSelection = expenses.reduce<Realeses>(
      (acc, { id: expenseId }) => {
        for (const { date } of mockMonths) {
          const release = realeses[expenseId]?.[date]

          acc[expenseId] = {
            ...acc[expenseId],
            [date]: {
              selected: release?.price > 0,
              price: release?.price,
            },
          }
        }

        return acc
      },
      {},
    )

    setAllReleases(updatedSelection)
  }, [expenses, realeses])

  useEffect(() => {
    if (!Object.keys(allRealeses).length) return

    const formattedRealeses = formatteRealeses(actionRelease)

    reset({ realeses: formattedRealeses })
  }, [allRealeses, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex justify-center">
        <ButtonSubmit submitting={isSubmitting} />
      </div>

      <Table.TableNotFlow className={cn(isSubmitting && 'opacity-50')}>
        <Table.TableHeader className="sticky top-16 z-[100] font-bold">
          <Table.TableRow>
            {mockMonths.map(({ id, month: asMonth }: any, index) => {
              const monthAtualy = month === index
              return (
                <Table.TableHead
                  key={id}
                  className={cn(
                    "bg-default p-2 text-center uppercase text-white data-[atualy='true']:!bg-orange-200 data-[atualy='true']:!text-orange-600",
                  )}
                  data-atualy={`${monthAtualy}`}
                >
                  {asMonth}
                </Table.TableHead>
              )
            })}
          </Table.TableRow>
        </Table.TableHeader>
        <Table.TableBody>
          {expenses.map(({ id: _id, description }: any) => (
            <Fragment key={_id}>
              <Table.TableRow className="odd:bg-default/30 odd:text-default">
                <Table.TableCell
                  colSpan={12}
                  className="py-2 font-bold"
                  style={{ letterSpacing: '2px' }}
                >
                  {description}
                </Table.TableCell>
              </Table.TableRow>
              <Table.TableRow>
                {mockMonths.map(({ id, date }: any, index) => {
                  const key = `${_id}_${id}`
                  const monthAtualy = month === index

                  return (
                    <Table.TableCell
                      key={key}
                      data-atualy={`${monthAtualy}`}
                      className={cn(
                        "p-2 data-[atualy='true']:!bg-orange-200 [&>input]:data-[atualy='true']:!border-orange-600 [&>input]:data-[atualy='true']:!bg-transparent [&>input]:data-[atualy='true']:!text-orange-600 [&>input]:data-[atualy='true']:placeholder:!text-orange-600",
                      )}
                    >
                      {allRealeses && allRealeses?.[_id]?.[date]?.selected ? (
                        <CtxMenu.ContextMenu>
                          <CtxMenu.ContextMenuTrigger className="flex h-[40px] w-24 items-center justify-end rounded-md border border-dashed border-gray-600 p-3 text-sm">
                            {maskPrice(allRealeses?.[_id]?.[date]?.price)}
                          </CtxMenu.ContextMenuTrigger>
                          <CtxMenu.ContextMenuContent className="w-14">
                            <CtxMenu.ContextMenuItem inset>
                              Editar
                              <CtxMenu.ContextMenuShortcut>
                                <Edit
                                  className="h-4 w-4 cursor-pointer"
                                  onClick={() =>
                                    setAllReleases((old) => ({
                                      ...old,
                                      [_id]: {
                                        ...old[_id],
                                        [date]: {
                                          ...old[_id]?.[date],
                                          selected: false,
                                        },
                                      },
                                    }))
                                  }
                                />
                              </CtxMenu.ContextMenuShortcut>
                            </CtxMenu.ContextMenuItem>
                          </CtxMenu.ContextMenuContent>
                        </CtxMenu.ContextMenu>
                      ) : (
                        <>
                          <Input
                            id={id}
                            type="tel"
                            placeholder="0,00"
                            className="min-w-20 text-right"
                            {...register(`realeses.${_id}.${date}.price`, {
                              onChange: (e) => {
                                const value = formatPrice(e.target.value)
                                e.target.value = value
                              },
                            })}
                          />
                          {errors?.realeses?.[_id]?.[date]?.price && (
                            <span className="text-red-500">
                              {errors?.realeses?.[_id]?.[date]?.price.message}
                            </span>
                          )}
                        </>
                      )}
                    </Table.TableCell>
                  )
                })}
              </Table.TableRow>
            </Fragment>
          ))}
        </Table.TableBody>
      </Table.TableNotFlow>
    </form>
  )
}
