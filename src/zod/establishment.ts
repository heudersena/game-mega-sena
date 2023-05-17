import * as z from "zod"
import { CompleteAddress, RelatedAddressModel, CompleteBet, RelatedBetModel } from "./index"

export const EstablishmentModel = z.object({
  id: z.string(),
  name: z.string(),
  number_phone: z.string(),
  number_code: z.string(),
  is_active: z.boolean(),
  geographic_location: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteEstablishment extends z.infer<typeof EstablishmentModel> {
  Address: CompleteAddress[]
  Bet: CompleteBet[]
}

/**
 * RelatedEstablishmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEstablishmentModel: z.ZodSchema<CompleteEstablishment> = z.lazy(() => EstablishmentModel.extend({
  Address: RelatedAddressModel.array(),
  Bet: RelatedBetModel.array(),
}))
