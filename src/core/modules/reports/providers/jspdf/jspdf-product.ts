import { jsPDF } from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { PdfProductProps } from '../../dtos/product'
import { PdfGenerator } from '../pdf-generator'
import { footer, header } from './utils'

const generateProduct = (items: PdfProductProps[]) => {
  const tableData: RowInput[] = []
  for (const item of items) {
    const { name, quantity, price } = item

    tableData.push([
      {
        content: name,
        styles: { valign: 'middle' },
      },
      {
        content: quantity,
        styles: { halign: 'center', cellWidth: 25, valign: 'middle' },
      },
      {
        content: `R$: ${parseFloat(price).toFixed(2).replace('.', ',')}`,
        styles: { halign: 'center', valign: 'middle' },
      },
    ])
  }
  return tableData
}

export const jspdfProduct: PdfGenerator<PdfProductProps> = {
  async generate(items: PdfProductProps[]) {
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
            styles: { valign: 'middle' },
          },
          {
            content: 'Qtde (ml/unid)',
            styles: {
              valign: 'middle',
              halign: 'center',
            },
          },
          {
            content: 'Preço',
            styles: {
              valign: 'middle',
              halign: 'center',
            },
          },
        ],
      ],
      body: generateProduct(items),
      theme: 'grid',
      margin: { top: 20, left: 5, right: 5 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 140, 115] },
      didDrawPage: () => {
        const pageNumber = pdf.getNumberOfPages()
        header(pdf, 'RELATÓRIO DE PRODUTOS')
        footer(pdf, pageNumber, '{total_page}')
      },
    })

    pdf.putTotalPages('{total_page}')

    const pdfOutput = pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  },
}
