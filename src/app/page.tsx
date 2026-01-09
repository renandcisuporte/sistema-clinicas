import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex h-svh flex-col items-center justify-center px-6 md:px-0">
      <Image
        src={'/RUBRICA-SISTEMA.png'}
        width={305}
        height={105}
        quality={100}
        className="w-full max-w-80"
        alt=""
      />
    </div>
  )
}
