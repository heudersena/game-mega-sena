import * as z from "zod"
import { CompleteAddress, RelatedAddressModel } from "./index"

export const PlayerModel = z.object({
  id: z.string(),
  name: z.string(),
  number_phone: z.string(),
  is_active: z.boolean(),
  is_role: z.string(),
  password: z.string(),
})

export interface CompletePlayer extends z.infer<typeof PlayerModel> {
  Address: CompleteAddress[]
}

/**
 * RelatedPlayerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlayerModel: z.ZodSchema<CompletePlayer> = z.lazy(() => PlayerModel.extend({
  Address: RelatedAddressModel.array(),
}))
