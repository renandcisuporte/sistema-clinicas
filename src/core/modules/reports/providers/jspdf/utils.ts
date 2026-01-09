import jsPDF from 'jspdf'

export const footer = (
  pdf: jsPDF,
  pageNumber: number,
  pageTotal: string = '',
) => {
  const pageHeight = pdf.internal.pageSize.getHeight()
  const pageWidth = pdf.internal.pageSize.getWidth()

  pdf.setFontSize(8)

  // Texto à esquerda
  pdf.text(
    `Gerado em: ${new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })}\nPágina ${pageNumber} de ${pageTotal}`,
    5,
    pageHeight - 5,
  )

  // Texto à direita
  pdf.text(
    'DClinicas - By Data Control Informatica (16) 3262-1365 / (16) 99716-6880',
    pageWidth - 5,
    pageHeight - 5,
    { align: 'right' },
  )
}

export const header = (pdf: jsPDF, title: string) => {
  const pageWidth = pdf.internal.pageSize.getWidth()

  pdf.setFillColor(202, 202, 202)
  pdf.rect(0, 0, pageWidth, 15, 'F')

  pdf.setFontSize(12)
  pdf.setTextColor(0)
  pdf.text(title, pageWidth / 2, 10, { align: 'center' })
}
