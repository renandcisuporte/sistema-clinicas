'use client'

import { ButtonSubmit } from '@/components/common/button-submit'
import * as CtxMenu from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
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

export function FormExpenseVariableClient({ expenses, realeses }: FormProps) {
  const [allRealeses, setAllRealeses] = useState<Realeses>({})

  const [selectedInput, setSelectedInput] = useState<string[]>([])

  const form = useForm<RealeseFormData>({
    resolver: zodResolver(realeseSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (formData: RealeseFormData) => {
    try {
      await actionRelease(formData)
    } catch (error) {
      console.log('[FORMEXPENSEVARIABLECLIENT] Error: ', error)
      toast({
        title: 'Erro ao salvar lançamentos!',
        description: (error as any)?.message,
      })
    }
  }

  useEffect(() => {
    if (!expenses || !realeses) return

    const updatedSelection = expenses
      .filter((item) => selectedInput.includes(item.id))
      .reduce<Realeses>((acc, { id: expenseId }) => {
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
      }, {})

    setAllRealeses(updatedSelection)
  }, [expenses, realeses, selectedInput])

  useEffect(() => {
    if (!Object.keys(allRealeses).length) return

    const formattedRealeses = formatteRealeses(actionRelease)

    reset({ realeses: formattedRealeses })
  }, [allRealeses, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex justify-center space-x-4">
        <MultiSelect
          options={expenses.map((item) => ({
            value: item.id,
            label: item.description!,
          }))}
          onValueChange={(value) => setSelectedInput(value)}
          defaultValue={selectedInput}
          placeholder="Selecione um tipo de gasto"
          variant="inverted"
          maxCount={5}
        />

        <ButtonSubmit submitting={isSubmitting} />
      </div>
      {!allRealeses.length && (
        <div className="text-center">
          <h3 className="text-xl">Nenhum lançamento feito!</h3>
          <small>
            Selecione um tipo de lançamento, e gerencie os gastos mensal
          </small>
        </div>
      )}
      {selectedInput.length > 0 && (
        <Table.TableNotFlow className="block">
          <Table.TableHeader className="sticky top-16 z-[1] font-bold">
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
            {expenses
              .filter((item) => selectedInput.includes(item.id))
              .map(({ id: _id, description }: any) => (
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
                          className={cn(
                            "p-2 data-[atualy='true']:!bg-orange-200 [&>input]:data-[atualy='true']:!border-orange-600 [&>input]:data-[atualy='true']:!bg-transparent [&>input]:data-[atualy='true']:!text-orange-600 [&>input]:data-[atualy='true']:placeholder:!text-orange-600",
                          )}
                          data-atualy={`${monthAtualy}`}
                        >
                          {allRealeses &&
                          allRealeses?.[_id]?.[date]?.selected ? (
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
                                        setAllRealeses((old) => ({
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
                                className="min-w-20"
                                style={{ direction: 'rtl' }}
                                {...register(`realeses.${_id}.${date}.price`, {
                                  onChange: (e) => {
                                    const value = formatPrice(e.target.value)
                                    e.target.value = value
                                  },
                                })}
                              />
                              {errors?.realeses?.[_id]?.[date]?.price && (
                                <span className="text-red-500">
                                  {
                                    errors?.realeses?.[_id]?.[date]?.price
                                      .message
                                  }
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
      )}
    </form>
  )
}
