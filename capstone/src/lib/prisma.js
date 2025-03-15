
// import { PrismaClient } from '@prisma/client'

// const prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') {
//     global.prisma = prisma
// }

// export { prisma }


import { PrismaClient } from '@prisma/client'

// Use PrismaClient with better error handling
const prismaClientSingleton = () => {
    return new PrismaClient({
    log: ['query', 'error', 'warn'],
    })
}

const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}