const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTransaction(userId, type, value, category, date) {
  return await prisma.transaction.create({
    data: {
      type,
      value,
      category,
      date: new Date(date),
      user: { connect: { id: userId } }
    }
  });
}

async function getTransactionsByUser(userId) {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  });
}

async function getTransactionSummary(userId) {
  const entradas = await prisma.transaction.aggregate({
    where: { userId, type: 'entrada' },
    _sum: { value: true }
  });
  const saidas = await prisma.transaction.aggregate({
    where: { userId, type: 'saida' },
    _sum: { value: true }
  });
  const entradaTotal = entradas._sum.value || 0;
  const saidaTotal = saidas._sum.value || 0;
  return {
    entradas: entradaTotal,
    saidas: saidaTotal,
    saldo: entradaTotal - saidaTotal
  };
}

module.exports = { createTransaction, getTransactionsByUser, getTransactionSummary };
