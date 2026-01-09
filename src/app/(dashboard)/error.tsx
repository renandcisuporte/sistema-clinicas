'use client'

export default function Error({ error }: { error: Error }) {
  console.error(error)
  return <p>Erro ao carregar a página</p>
}
