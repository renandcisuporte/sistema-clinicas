import { jsPDF } from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { PdfProcedimentProps } from '../../dtos/procediment'
import { PdfGenerator } from '../pdf-generator'
import { footer, header } from './utils'

const generateProcediment = (items: PdfProcedimentProps[]) => {
  let currentGroup = ''
  let groupTotal = 0

  const currency = (value: number | string) =>
    `R$: ${Number(value).toFixed(2).replace('.', ',')}`

  return items.reduce<RowInput[]>((acc, item, index) => {
    const nextItem = items[index + 1]

    const {
      serviceId,
      serviceName,
      productName,
      productQuantity,
      productPrice,
      rental,
      rentalPrice,
    } = item

    if (currentGroup !== serviceId) {
      currentGroup = serviceId!

      acc.push([
        {
          content: serviceName,
          colSpan: 5,
          styles: {
            halign: 'center',
            fillColor: [105, 105, 105],
            textColor: '#fff',
            fontStyle: 'bold',
          },
        },
      ])
    }

    acc.push([
      { content: productName },
      { content: productQuantity, styles: { halign: 'center' } },
      {
        content: currency(productPrice),
        styles: { halign: 'center' },
      },
      { content: rental, styles: { halign: 'center', cellWidth: 25 } },
      { content: currency(rentalPrice), styles: { halign: 'right' } },
    ])

    groupTotal += Number(rentalPrice)

    if (!nextItem || nextItem.serviceId !== serviceId) {
      acc.push([
        {
          content: `Total do Grupo: ${currency(groupTotal)}`,
          colSpan: 5,
          styles: {
            halign: 'right',
            fillColor: [240, 240, 240],
            fontSize: 12,
            fontStyle: 'bold',
          },
        },
      ])
      groupTotal = 0
    }

    return acc
  }, [])
}

export const jspdfProcediment: PdfGenerator<PdfProcedimentProps> = {
  async generate(items: PdfProcedimentProps[]) {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    pdf.setFontSize(12)
    pdf.setFillColor(202, 202, 202)
    pdf.rect(0, 0, 212, 15, 'F')

    autoTable(pdf, {
      head: [
        [
          {
            content: 'Produto',
            styles: { fillColor: [25, 140, 115], valign: 'middle' },
          },
          {
            content: 'Qtde (ml/unid)',
            styles: {
              fillColor: [25, 140, 115],
              valign: 'middle',
              halign: 'center',
            },
          },
          {
            content: 'Total',
            styles: {
              fillColor: [25, 140, 115],
              valign: 'middle',
              halign: 'center',
            },
          },
          {
            content: 'Rendimento',
            styles: { fillColor: [25, 140, 115], valign: 'middle' },
          },
          {
            content: 'Valor Aplicação',
            styles: {
              fillColor: [25, 140, 115],
              valign: 'middle',
              halign: 'center',
            },
          },
        ],
      ],
      body: generateProcediment(items),
      theme: 'grid',
      margin: { top: 20, left: 5, right: 5 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 140, 115] },
      didDrawPage: () => {
        const pageNumber = pdf.getNumberOfPages()
        header(pdf, 'RELATÓRIO DE PROCEDIMENTO')
        footer(pdf, pageNumber, '{total_page}')
      },
    })

    pdf.putTotalPages('{total_page}')

    const pdfOutput = pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  },
}
