import { OutputClinic } from '~/modules/clinics/dtos/output-clinic'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { UpdateClinic } from '../dtos/update-clinic'

type Input = UpdateClinic

type Output = OutputClinic

type Dependencies = { repository: ClinicRepository }

export const updateClinicUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(data: Input): Promise<Output> {
      const result = await repository.save(data)

      // const { fantasy, clinicId } = result
      // queue.mail.push({
      //   from: `"${fantasy}" <contato@dclinicas.com.br>`,
      //   to: 'contato@dclinicas.com.br',
      //   subject: `Cadastro de ${fantasy}`,
      //   text: `Olá, ${fantasy} foi cadastrado com sucesso!`,
      //   html: `
      //     <h1>Cadastro de ${fantasy}</h1>
      //     <p>Olá, ${fantasy} foi cadastrado com sucesso!</p>
      //     <p>clique no link abaixo para acessar o sistema</p>
      //     <a href="http://localhost:3000/login">Acessar sistema</a>
      //     <p>Code: ${clinicId}</p>
      //     <p>Se você não solicitou este cadastro, entre em contato com o suporte</p>
      //   `
      // })

      return { data: result }
    },
  }
}
