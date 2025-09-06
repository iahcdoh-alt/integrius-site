import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  message: z.string().min(5).max(500),
  product: z.enum(['10equinze', 'msa', 'geral']).default('geral')
})
export type LeadInput = z.infer<typeof leadSchema>
