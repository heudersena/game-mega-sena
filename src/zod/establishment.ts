import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteAddress, RelatedAddressModel, CompleteBet, RelatedBetModel } from "./index"

export const EstablishmentModel = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  seller_code: z.string().nullish(),
  number_phone: z.string(),
  number_code: z.string(),
  is_active: z.boolean(),
  description: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteEstablishment extends z.infer<typeof EstablishmentModel> {
  user: CompleteUser
  Address: CompleteAddress[]
  Bet: CompleteBet[]
}

/**
 * RelatedEstablishmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEstablishmentModel: z.ZodSchema<CompleteEstablishment> = z.lazy(() => EstablishmentModel.extend({
  user: RelatedUserModel,
  Address: RelatedAddressModel.array(),
  Bet: RelatedBetModel.array(),
}))
