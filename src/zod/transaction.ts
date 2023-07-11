import * as z from "zod"
import { Decimal } from "decimal.js"
import { transaction_type, m_status, m_status_detail } from "@prisma/client"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const TransactionModel = z.object({
  id: z.number().int(),
  amount: z.number(),
  type: z.nativeEnum(transaction_type),
  m_id: z.number().int().nullish(),
  m_status: z.nativeEnum(m_status).nullish(),
  m_status_detail: z.nativeEnum(m_status_detail),
  m_email: z.string().nullish(),
  m_qr_code: z.string().nullish(),
  m_ticket_url: z.string().nullish(),
  m_transaction_id: z.string().nullish(),
  m_qr_code_base64: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})
