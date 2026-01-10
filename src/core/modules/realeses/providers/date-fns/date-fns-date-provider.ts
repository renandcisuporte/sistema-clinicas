import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'
import { DateRangeFilter } from '../date'

export const dateFnsDateProvider: DateRangeFilter = {
  execute({ startDate, endDate }) {
    if (!startDate && !endDate) {
      return undefined
    }

    return {
      ...(startDate && {
        gte: startOfDay(fromZonedTime(parseISO(startDate), 'UTC')),
      }),
      ...(endDate && {
        lte: endOfDay(fromZonedTime(parseISO(endDate), 'UTC')),
      }),
    }
  },
}
