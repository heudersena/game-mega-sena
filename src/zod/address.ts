import * as z from "zod"
import { CompleteEstablishment, RelatedEstablishmentModel } from "./index"

export const AddressModel = z.object({
  id: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
  establishmentId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteAddress extends z.infer<typeof AddressModel> {
  establishment: CompleteEstablishment
}

/**
 * RelatedAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAddressModel: z.ZodSchema<CompleteAddress> = z.lazy(() => AddressModel.extend({
  establishment: RelatedEstablishmentModel,
}))
