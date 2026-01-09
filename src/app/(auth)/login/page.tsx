import { PageClient } from '@/(auth)/login/page-client'
import { Icons } from '@/components/common/icons'
import Image from 'next/image'

export const metadata = {
  title: 'Login',
}

export default function Home() {
  return (
    <div className="flex h-svh flex-col items-center justify-center bg-[image:url(/bg-login-mobile.jpg)] bg-[size:cover] px-6 md:bg-[image:url(/bg-login.jpg)] md:px-0">
      <PageClient />
      <address className="text-md bg-default absolute bottom-0 left-0 flex w-full items-center justify-between p-4 text-white [&>aside]:flex [&>aside]:flex-row [&>aside]:items-center [&>aside]:space-x-2 [&>aside]:uppercase [&>aside]:leading-4">
        <aside>
          <Icons.whatsapp className="h-8 w-8 fill-white" />
          <span>
            suporte:
            <br />
            16 99760-3861
          </span>
        </aside>
        <aside>
          <span>Tecnologia Desenvolvida por:</span>
          <Image
            alt="Data Control Informática LTDA"
            src="/rubrica.png?v=as"
            width={125}
            height={95}
            quality={100}
            className="h-auto w-28"
          />
        </aside>
      </address>
    </div>
  )
}
