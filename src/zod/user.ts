import * as z from "zod"
import { TYPEROLEUSER } from "@prisma/client"
import { CompleteCode_Users, RelatedCode_UsersModel, CompleteEstablishment, RelatedEstablishmentModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  code_ref_user: z.string().nullish(),
  email: z.string(),
  password: z.string(),
  recover_password: z.string().nullish(),
  access_role: z.nativeEnum(TYPEROLEUSER),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Code_Users: CompleteCode_Users[]
  Establishment: CompleteEstablishment[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Code_Users: RelatedCode_UsersModel.array(),
  Establishment: RelatedEstablishmentModel.array(),
}))
