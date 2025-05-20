const { createTransaction, getTransactionsByUser, getTransactionSummary } = require('../models/transaction.model');

async function addTransaction(req, res) {
  const { type, value, category, date } = req.body;
  const transaction = await createTransaction(req.user.id, type, value, category, date);
  res.status(201).json(transaction);
}

async function listTransactions(req, res) {
  const transactions = await getTransactionsByUser(req.user.id);
  res.json(transactions);
}

async function getSummary(req, res) {
  const summary = await getTransactionSummary(req.user.id);
  res.json(summary);
}

module.exports = { addTransaction, listTransactions, getSummary };
