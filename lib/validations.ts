import { z } from "zod"

export const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Telefone inválido"),
  message: z.string().min(5, "Escreva uma mensagem"),
  // ⬇️ obrigatório (sem .optional())
  product: z.enum(["10equinze", "msa", "geral"])
})

export type LeadInput = z.infer<typeof leadSchema>
