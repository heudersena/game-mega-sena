import * as z from "zod"

export const GameModel = z.object({
  id: z.string(),
  match_id: z.number().int(),
  numbers: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
