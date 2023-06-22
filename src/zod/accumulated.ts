import * as z from "zod"
import { Decimal } from "decimal.js"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const AccumulatedModel = z.object({
  id: z.number().int(),
  money: z.number().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})
