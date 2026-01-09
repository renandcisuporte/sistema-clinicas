export const getParam = (params: URLSearchParams, key: string) => {
  const value = params.get(key)

  if (!value) return undefined

  const normalized = value.trim()

  if (
    normalized === '' ||
    normalized === 'all' ||
    normalized === 'undefined' ||
    normalized === 'null'
  ) {
    return undefined
  }

  return normalized
}

export function formattedPagination(
  page: number,
  limit: number,
  total: number,
): string {
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
  return `(${start}/${end})`
}

export function formatteRealeses(values: Object) {
  return Object.fromEntries(
    Object.entries(values).map(([uuid, date]) => [
      uuid,
      Object.fromEntries(
        Object.entries(date).map(([data, rest]) => [
          data,
          {
            ...(rest as any),
            price: (rest as any).price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          },
        ]),
      ),
    ]),
  )
}

export function dateToInput(value?: Date | string | null) {
  if (!value) return ''
  const date = new Date(value)
  return date.toISOString().slice(0, 10)
}
