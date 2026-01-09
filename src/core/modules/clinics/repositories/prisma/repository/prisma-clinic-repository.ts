import { Clinic } from '~/modules/clinics/dtos/clinic'
import { OutputPaginateClinic } from '~/modules/clinics/dtos/output-paginate-clinic'
import { SearchClinic } from '~/modules/clinics/dtos/search-clinic'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { prisma } from '~/shared/prisma'

export const prismaClinicRepository: ClinicRepository = {
  async averageService(id: string, time: string): Promise<string> {
    const response = await prisma.clinic.update({
      where: { id, deletedAt: null },
      data: { averageService: time },
    })

    return response.averageService?.toString() ?? ''
  },

  async findByCode(code: string): Promise<string | null> {
    const response = await prisma.clinic.findUnique({
      where: {
        clinicId: code,
        deletedAt: null,
      },
      include: {
        userAdmin: {
          select: {
            user: true,
          },
        },
      },
    })

    if (!response) return null

    const { id } = response
    return id
  },

  async findAll({
    title,
    fantasy,
    cnpj,
    clinicId,
    limit = 15,
    page = 1,
  }: SearchClinic): Promise<OutputPaginateClinic> {
    const where: any = {}
    const conditions: any = []

    if (title) conditions.push({ title: { contains: title } })

    if (fantasy) conditions.push({ fantasy: { contains: fantasy } })

    if (cnpj) conditions.push({ cnpj: { contains: cnpj } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const [total, data] = await prisma.$transaction([
      prisma.clinic.count({
        where: { deletedAt: null, id: clinicId, ...where },
      }),
      prisma.clinic.findMany({
        where: { deletedAt: null, id: clinicId, ...where },
        skip: Number((page - 1) * limit),
        take: Number(limit),
      }),
    ])

    return {
      data,
      total,
    }
  },

  async findFirst(id: string): Promise<Clinic | null> {
    const response = await prisma.clinic.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!response) return null

    return response
  },

  async save(input: Clinic): Promise<Clinic> {
    const common = {
      clinicId: input.clinicId?.trim() ?? null,
      title: input.title?.trim(),
      fantasy: input.fantasy?.trim(),
      cnpj: input.cnpj?.trim(),
      ie: input.ie?.trim() ?? null,
      phone: input.phone?.trim() ?? null,
      mobilePhone: input.mobilePhone?.trim() ?? null,
      averageService: input.averageService?.trim() ?? null,
      address: input.address?.trim() ?? null,
      number: input.number?.trim() ?? null,
      neighborhood: input.neighborhood?.trim() ?? null,
      complement: input.complement?.trim() ?? null,
      reference: input.reference?.trim() ?? null,
      city: input.city?.trim() ?? null,
      state: input.state?.trim() ?? null,
      zipCode: input.zipCode?.trim() ?? null,
    }

    const result = await prisma.clinic.upsert({
      where: { id: input.id },
      create: common,
      update: common,
    })

    return result
  },

  async delete(id: string): Promise<void> {
    await prisma.clinic.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },
}
