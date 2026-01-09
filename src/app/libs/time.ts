export function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function calculateToHours(
  times: Record<string, any>[],
  open: boolean,
): number {
  if (open) return 0

  let total = 0
  let openMinute = 0
  let closeMinute = 0

  for (const { description, time } of times) {
    if (description === 'Abre à(s)') openMinute = timeToMinutes(time)
    if (description === 'Fecha à(s)') closeMinute = timeToMinutes(time)

    if (openMinute && closeMinute) {
      total += closeMinute - openMinute
      openMinute = closeMinute = 0
    }
  }

  return total / 60
}
