import * as z from "zod"
import { Decimal } from "decimal.js"
import { CompleteGame, RelatedGameModel } from "./index"

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
  ref_id: z.number().int(),
  gameId: z.string(),
  total_prizes: z.number().nullish(),
  subtract_premiums: z.number().nullish(),
  seine: z.number().nullish(),
  corner: z.number().nullish(),
  block: z.number().nullish(),
  player_seine: z.number().nullish(),
  player_corner: z.number().nullish(),
  player_block: z.number().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteAward extends z.infer<typeof AwardModel> {
  gemer: CompleteGame
}

/**
 * RelatedAwardModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAwardModel: z.ZodSchema<CompleteAward> = z.lazy(() => AwardModel.extend({
  gemer: RelatedGameModel,
}))
