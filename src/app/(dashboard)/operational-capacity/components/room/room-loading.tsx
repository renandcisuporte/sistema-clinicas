export function RoomLoading() {
  return (
    <div className="max-w-xs mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-5">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-48"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
