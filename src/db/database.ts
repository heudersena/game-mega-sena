import { PrismaClient } from "@prisma/client";

// { log: ["query", "info", "error", "warn"] }
const prisma = new PrismaClient({ log: ["query"] }) // log: ["query"]

export { prisma }

// prisma.$disconnect();