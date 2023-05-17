import * as z from "zod"
import { TYPEROLEUSER } from "@prisma/client"

export const UserModel = z.object({
  id: z.string(),
  code_ref_user: z.string().nullish(),
  email: z.string(),
  password: z.string(),
  access_role: z.nativeEnum(TYPEROLEUSER),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
})
