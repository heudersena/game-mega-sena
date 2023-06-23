import * as z from "zod"
import { Decimal } from "decimal.js"
import { IS_COMPLETEDA_AWARD } from "@prisma/client"

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

export const AwardModel = z.object({
  id: z.string(),
  gamer_ref: z.number().int(),
  total_prizes: z.number().nullish(),
  subtract_premiums: z.number().nullish(),
  seine: z.number().nullish(),
  corner: z.number().nullish(),
  block: z.number().nullish(),
  player_seine: z.number().nullish(),
  player_corner: z.number().nullish(),
  player_block: z.number().nullish(),
  is_completed: z.nativeEnum(IS_COMPLETEDA_AWARD),
  created_at: z.date(),
  updated_at: z.date(),
})
