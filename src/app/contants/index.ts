export const schemaTheme = {
  bgDefault: '#1ca69d',
  bgDefault100: '#72b21a',
  bgDefault200: '#00b050',
}

export const weeks = [
  {
    week: 'Domingo',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
  {
    week: 'Segunda',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
  {
    week: 'Terça',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
  {
    week: 'Quarta',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
  {
    week: 'Quinta',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
  {
    week: 'Sexta',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
  {
    week: 'Sábado',
    open: true,
    times: [
      {
        description: 'Abre à(s)',
        time: '08:00',
      },
      {
        description: 'Fecha à(s)',
        time: '12:00',
      },
    ],
  },
]

export const year = new Date().getUTCFullYear()

export const month = new Date().getUTCMonth()

export const day = new Date().getUTCDay()

export const mockMonths = [
  { id: 'January', date: `${year}-01-01`, month: 'Janeiro' },
  { id: 'February', date: `${year}-02-01`, month: 'Fevereiro' },
  { id: 'March', date: `${year}-03-01`, month: 'Março' },
  { id: 'April', date: `${year}-04-01`, month: 'Abril' },
  { id: 'May', date: `${year}-05-01`, month: 'Maio' },
  { id: 'June', date: `${year}-06-01`, month: 'Junho' },
  { id: 'July', date: `${year}-07-01`, month: 'Julho' },
  { id: 'August', date: `${year}-08-01`, month: 'Agosto' },
  { id: 'September', date: `${year}-09-01`, month: 'Setembro' },
  { id: 'October', date: `${year}-10-01`, month: 'Outubro' },
  { id: 'November', date: `${year}-11-01`, month: 'Novembro' },
  { id: 'December', date: `${year}-12-01`, month: 'Dezembro' },
]
