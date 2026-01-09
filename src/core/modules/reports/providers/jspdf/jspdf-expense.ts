import { jsPDF } from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { PdfExpenseProps } from '../../dtos/expense'
import { PdfGenerator } from '../pdf-generator'
import { footer, header } from './utils'

type ExpenseGroup = {
  description: string
  totals: Record<string, number>
}

type GroupedExpenses = Record<string, ExpenseGroup>

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const currency = (value: number = 0) => {
  // Remove qualquer caractere que não seja número ou ponto decimal
  const newValue = String(value).replace(/[^\d.]/g, '')

  // Converte para número, garantindo que seja tratado corretamente como decimal
  const numericValue = parseFloat(newValue)

  // Formata o número para centavos e adiciona o símbolo de moeda R$
  // Retorna 0,00 caso o valor não seja um número válido
  if (isNaN(numericValue)) return '0,00'

  // Formata o valor para o formato brasileiro (0.000,00)
  const formattedValue = numericValue
    .toFixed(2) // Garante duas casas decimais
    .replace('.', ',') // Substitui o ponto por vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Adiciona os pontos separadores de milhar

  return formattedValue
}
// `R$ ${value === 0 ? '0,00' : value.toFixed(2).replace('.', ',')}`

function generateMonts(): RowInput[] {
  return [
    [
      {
        content: 'JAN',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'FEV',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'MAR',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'ABR',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'MAI',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'JUN',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'JUL',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'AGO',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'SET',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'OUT',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'NOV',
        styles: { valign: 'middle', halign: 'center' },
      },
      {
        content: 'DEZ',
        styles: { valign: 'middle', halign: 'center' },
      },
    ],
  ]
}

function generateGroupExpense(items: PdfExpenseProps[]) {
  return items.reduce<GroupedExpenses>((acc, item) => {
    const month = item.date.getUTCMonth()

    if (!acc[item.expenseId!]) {
      acc[item.expenseId!] = {
        description: item.description!,
        totals: {},
      }
    }

    // agrupamento pelo mes somando o valores
    acc[item.expenseId!].totals[month] =
      (acc[item.expenseId!].totals[month] || 0) + item.price

    return acc
  }, {})
}

function generateExpense(items: GroupedExpenses) {
  const rows: RowInput[] = []

  let totalAmount = 0
  for (const expense of Object.values(items)) {
    const total = Object.values(expense.totals).reduce(
      (acc, value) => acc + value,
      0,
    )
    totalAmount += total

    rows.push([
      {
        content: expense.description,
        colSpan: 12,
        styles: {
          fontStyle: 'bold',
          fillColor: [240, 240, 240],
        },
      },
    ])

    rows.push(
      months.map((month) => ({
        content: currency(expense.totals[month]),
        styles: {
          halign: 'right',
          cellPadding: 3,
        },
      })),
    )

    // Deve somar
    rows.push([
      {
        colSpan: 10,
        content: 'TOTAL',
        styles: {
          fillColor: [240, 240, 240],
          fontStyle: 'bold',
          halign: 'right',
        },
      },
      {
        colSpan: 2,
        content: currency(total),
        styles: {
          fontStyle: 'bold',
          fillColor: [240, 240, 240],
          halign: 'right',
        },
      },
    ])
  }

  rows.push([
    {
      content: '',
      colSpan: 12,
    },
  ])

  rows.push([
    {
      colSpan: 10,
      content: 'TOTAL',
      styles: {
        fontStyle: 'bold',
        halign: 'right',
        fontSize: 16,
      },
    },
    {
      colSpan: 2,
      content: currency(totalAmount),
      styles: {
        fontStyle: 'bold',
        fillColor: [25, 140, 115],
        textColor: [255, 255, 255],
        halign: 'right',
        fontSize: 16,
      },
    },
  ])

  return rows
}

export const jspdfExpense: PdfGenerator<PdfExpenseProps> = {
  async generate(items: PdfExpenseProps[], payload) {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    pdf.setFontSize(9)
    pdf.text(payload, 5, 20)
    const { h } = pdf.getTextDimensions(payload, {
      maxWidth: 100,
    })

    const head = [...generateMonts()]

    const generateGroup = generateGroupExpense(items)

    const body: RowInput[] = [...generateExpense(generateGroup)]

    autoTable(pdf, {
      head,
      body,
      theme: 'plain',
      margin: { top: h + 20, left: 5, right: 5 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 140, 115], fontStyle: 'bold' },
      didDrawPage: () => {
        const pageNumber = pdf.getNumberOfPages()
        header(pdf, 'RELATÓRIO DE DESPESAS')
        footer(pdf, pageNumber, '{total_page}')
      },
    })

    pdf.putTotalPages('{total_page}')

    const pdfOutput = pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  },
}
