import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync('dci@6913', salt)

  const dci = await prisma.user.upsert({
    where: { email: 'dci@dcisuporte.com.br' },
    create: {
      email: 'dci@dcisuporte.com.br',
      fullName: 'dci suporte',
      password,
      admin: 'root'
    },
    update: {
      email: 'dci@dcisuporte.com.br',
      fullName: 'dci suporte',
      password,
      admin: 'root'
    }
  })

  const passwordFidelis = bcrypt.hashSync('daniela@1365', salt)
  const fidelis = await prisma.user.upsert({
    where: { email: 'daniela@dclinicas.com.br' },
    update: {},
    create: {
      email: 'daniela@dclinicas.com.br',
      fullName: 'daniela',
      password: passwordFidelis,
      admin: 'admin'
    }
  })

  const clinic = {
    fantasy: 'fantasy',
    cnpj: '66.686.847/0001-80',
    ie: '00000000',
    title: 'Titulo Fantasy',
    address: 'Amaral Lyra',
    number: '1155',
    complement: 'Sala 15',
    city: 'Itápolis',
    state: 'SP'
  }

  await prisma.clinic.upsert({
    where: { clinicId: '010-010' },
    update: {
      ...clinic,
      clinicId: '010-010'
    },
    create: {
      ...clinic,
      clinicId: '010-010'
    }
  })

  await prisma.clinic.upsert({
    where: { clinicId: '020-020' },
    update: {
      ...clinic,
      clinicId: '020-020'
    },
    create: {
      ...clinic,
      clinicId: '020-020'
    }
  })

  console.log({ dci, fidelis })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
