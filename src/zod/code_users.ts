import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const Code_UsersModel = z.object({
  id: z.number().int(),
  code: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  userId: z.number().int(),
})

export interface CompleteCode_Users extends z.infer<typeof Code_UsersModel> {
  user: CompleteUser
}

/**
 * RelatedCode_UsersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCode_UsersModel: z.ZodSchema<CompleteCode_Users> = z.lazy(() => Code_UsersModel.extend({
  user: RelatedUserModel,
}))
