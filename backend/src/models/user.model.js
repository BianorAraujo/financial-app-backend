const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(email, passwordHash) {
  return await prisma.user.create({
    data: { email, password: passwordHash }
  });
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

module.exports = { createUser, findUserByEmail };