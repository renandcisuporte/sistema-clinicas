import { Loader } from 'lucide-react'

export function LoadingAnimation() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Loader
          className="h-16 w-16 animate-spin fill-default"
          strokeWidth={1}
        />
      </div>
    </div>
  )
}
