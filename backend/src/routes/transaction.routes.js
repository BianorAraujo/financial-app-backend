const express = require('express');
const router = express.Router();
const { addTransaction, listTransactions, getSummary } = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);
router.post('/', addTransaction);
router.get('/', listTransactions);
router.get('/summary', getSummary);

module.exports = router;