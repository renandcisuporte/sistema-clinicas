export default function Loading() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px] animate-pulse space-y-3">
        {/* Header meses */}
        <div className="grid-cols-13 grid gap-2">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className={`h-10 rounded-md ${
                i === 12 ? 'bg-orange-200' : 'bg-teal-200'
              }`}
            />
          ))}
        </div>

        {/* Linhas */}
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="space-y-2">
            {/* Label da despesa */}
            <div className="h-8 w-full rounded-md bg-teal-100" />

            {/* Inputs */}
            <div className="grid-cols-13 grid gap-2">
              {Array.from({ length: 13 }).map((_, col) => (
                <div
                  key={col}
                  className={`h-10 rounded-md ${
                    col === 12 ? 'bg-orange-200' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
