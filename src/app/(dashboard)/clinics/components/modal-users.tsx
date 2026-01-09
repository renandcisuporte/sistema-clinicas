'use client'

import { saveWorkTime } from '@/actions/work-times'
import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import * as Dialog from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { weeks } from '@/contants'
import { useToast } from '@/hooks/use-toast'
import {
  useHandleAdd,
  useHandleCalculateTotalHours,
  useHandleRemove,
} from '@/hooks/use-work-times'
import { WorkTime } from '@/types/work-times'
import { Ban, Minus, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
} from 'react-dom'

export interface ModalUsersInterface {
  open: boolean
  input?: WorkTime[]
}

export function ModalUsers({ open, input }: ModalUsersInterface) {
  const { back } = useRouter()
  const { toast } = useToast()
  const [items, setItems] = useState<WorkTime[]>([])
  const { page } = useParams()

  const [state, formAction] = useFormState(saveWorkTime, {})

  const handleAdd = useHandleAdd(items, setItems)

  const handleRemove = useHandleRemove(items, setItems)

  const calculateTotalHours = useHandleCalculateTotalHours()

  useEffect(() => {
    if (!state?.errorMessage) return

    if (state?.errorMessage !== 'OK') {
      toast({ title: 'Atenção!', description: state?.errorMessage })
      return
    }
    toast({ title: 'Atenção!', description: 'Salvo com sucesso!' })
    back()
  }, [state, back, toast])

  useEffect(() => {
    if (weeks.length > 0) setItems(weeks)
    if (!input?.length) return
    const updatedItems = input.reduce(
      (acc, { open, times, week }) => {
        const key = acc.findIndex((item) => item.week === week)

        if (key !== -1) acc[key] = { ...acc[key], open, times }
        else acc.push({ week, open, times })

        return acc
      },
      [...items],
    )

    setItems(updatedItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  return (
    <Dialog.Dialog open={open} onOpenChange={() => back()} modal={true}>
      <Dialog.DialogContent
        className="h-full max-h-[96%] max-w-xl !p-0"
        aria-describedby={undefined}
      >
        <ScrollArea className="h-full">
          <form action={formAction} className="space-y-4 p-6">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>Horário de Funcionamento</Dialog.DialogTitle>
            </Dialog.DialogHeader>
            <input type="hidden" name="clinicId" defaultValue={page[0]!} />
            {items.map(({ week, open, times }, i) => (
              <div key={week}>
                <input
                  type="hidden"
                  name={`week[${i}][week]`}
                  defaultValue={week}
                />

                <h4 className="flex items-center justify-between space-x-2">
                  <span className="flex items-center space-x-2 font-semibold">
                    <span>{week}</span>
                    <Plus
                      className="w-4 cursor-pointer"
                      onClick={() => handleAdd({ week, open, times }, i)}
                    />
                  </span>
                  <small className="font-bold text-default">
                    Total de horas: {calculateTotalHours(times, open)}h
                  </small>
                </h4>
                <div className="mb-2 flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      name={`week[${i}][open]`}
                      checked={open}
                      value={'true'}
                      onClick={() => {
                        const item = [...items]
                        item[i].open = !item[i].open
                        setItems(item)
                      }}
                    />
                    <label
                      htmlFor="terms2"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fechado
                    </label>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap border-b border-b-neutral-300">
                  {times.map(({ description, time }, ii) => (
                    <div
                      key={ii}
                      className="flex w-1/2 flex-row flex-wrap space-x-4 p-2"
                    >
                      <input
                        type="hidden"
                        name={`week[${i}][times][${ii}][description]`}
                        defaultValue={description}
                      />

                      <InputLabel
                        label={description}
                        classHelper="flex-1"
                        type="time"
                        defaultValue="time"
                        name={`week[${i}][times][${ii}][time]`}
                        onChange={(e) => {
                          const item = [...items]
                          item[i].times[ii].description = description
                          item[i].times[ii].time = e.target.value
                          setItems(item)
                        }}
                      />

                      {ii % 2 && ii > 1 ? (
                        <Minus
                          className="mt-7 w-4"
                          onClick={() => handleRemove(i)}
                        />
                      ) : (
                        <span className="w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Dialog.DialogClose asChild>
              <Button variant="ghost" type="button">
                <Ban className="mr-1 w-4" />
                Cancelar
              </Button>
            </Dialog.DialogClose>
            <ButtonSubmit />
          </form>
        </ScrollArea>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
