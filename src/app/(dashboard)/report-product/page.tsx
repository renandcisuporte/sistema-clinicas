import { PageClient } from "./page-client"

export default function Page() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Relatório de Produtos</h1>
      <PageClient />
    </div>
  )
}
