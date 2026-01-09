export function maskPrice(value: unknown): string {
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

export function formatPrice(value: any): string {
  // Remove qualquer caractere que não seja número
  const numericValue = String(value).replace(/\D/g, '')

  // Converte para centavos
  const centavosValue = (parseInt(numericValue) / 100).toFixed(2)

  // Formata o valor para o formato brasileiro (0.000,00)
  const formattedValue = centavosValue
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return formattedValue
}

export function maskDocument(str: string): string {
  let doc = str.replace(/\D/g, '')
  if (doc.length <= 11) {
    return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4')
  }

  return doc.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/,
    '$1.$2.$3/$4-$5',
  )
}

export function maskPhone(str: string): string {
  let phone = str.replace(/\D/g, '')

  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }

  return phone.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}

export function maskZipCode(str: string): string {
  let zipCode = str.replace(/\D/g, '')
  return zipCode.replace(/(\d{5})(\d{3})$/, '$1-$2')
}
