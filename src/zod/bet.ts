import * as z from "zod"
import { BETSTATUS } from "@prisma/client"
import { CompleteEstablishment, RelatedEstablishmentModel } from "./index"

export const BetModel = z.object({
  id: z.number().int(),
  establishmentId: z.number().int(),
  number_game_result: z.string(),
  numbers: z.string(),
  status: z.nativeEnum(BETSTATUS),
  awarded: z.boolean(),
  hits: z.number().int(),
  namber_bet: z.number().int().nullish(),
  hits_round: z.number().int().nullish(),
  namber_round: z.string().nullish(),
  isPaymentClient: z.number().int(),
  code_cart: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteBet extends z.infer<typeof BetModel> {
  establishment: CompleteEstablishment
}

/**
 * RelatedBetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBetModel: z.ZodSchema<CompleteBet> = z.lazy(() => BetModel.extend({
  establishment: RelatedEstablishmentModel,
}))
