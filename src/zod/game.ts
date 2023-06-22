import * as z from "zod"
import { CompleteAward, RelatedAwardModel } from "./index"

export const GameModel = z.object({
  id: z.string(),
  match_id: z.number().int(),
  numbers: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteGame extends z.infer<typeof GameModel> {
  Award: CompleteAward[]
}

/**
 * RelatedGameModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameModel: z.ZodSchema<CompleteGame> = z.lazy(() => GameModel.extend({
  Award: RelatedAwardModel.array(),
}))
