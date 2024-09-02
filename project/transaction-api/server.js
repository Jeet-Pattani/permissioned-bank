const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/transactionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema and model for transactions
const transactionSchema = new mongoose.Schema({
    address: String,
    amount: Number,
    transactionHash: String,
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware
app.use(bodyParser.json());

// API to record a new transaction
app.post('/transactions', async (req, res) => {
    const { address, amount, transactionHash } = req.body;

    if (!address || !amount || !transactionHash) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = new Transaction({
        address,
        amount,
        transactionHash
    });

    try {
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save transaction' });
    }
});

// API to retrieve a transaction by ID
app.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transaction' });
    }
});

// API to list all transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
