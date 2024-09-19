const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./requests.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create tables if they don't exist
        db.run(`
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,          -- 'withdraw', 'borrow', 'deposit'
            assetType TEXT NOT NULL,     -- 'erc20' or 'nft'
            tokenAddress TEXT,
            amount REAL,
            nftAddress TEXT,
            walletAddress TEXT,
            TrnxHash TEXT,
            tokenId INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            approved BOOLEAN DEFAULT FALSE  -- New column for approval status
        );

        `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Table "requests" is ready.');
            }
        });
    }
});

// Helper function to log request data
const logRequestData = (endpoint, data) => {
    console.log(`Endpoint: ${endpoint}, Data: ${JSON.stringify(data)}`);
};

// Helper function to log operation results
const logOperationResult = (operation, err) => {
    if (err) {
        console.error(`${operation} failed: ${err.message}`);
    } else {
        console.log(`${operation} successful.`);
    }
};

// Function to fetch and log inserted row data from the DB
const logInsertedData = (operation) => {
    db.get(`SELECT * FROM requests ORDER BY id DESC LIMIT 1`, (err, row) => {
        if (err) {
            console.error(`Error fetching the last inserted record after ${operation}:`, err.message);
        } else {
            console.log(`Last inserted record after ${operation}:`, row);
        }
    });
};

// Endpoints to handle requests

// Endpoint for ERC-20 Token Deposit
app.post('/api/deposit/erc20', (req, res) => {
    const { tokenAddress, amount } = req.body;
    logRequestData('/api/deposit/erc20', req.body);
    
    const query = `INSERT INTO requests (type, assetType, tokenAddress, amount) VALUES (?, ?, ?, ?)`;
    db.run(query, ['deposit', 'erc20', tokenAddress, amount], (err) => {
        logOperationResult('ERC-20 deposit', err);
        if (err) {
            res.status(500).send('Error processing ERC-20 deposit request');
        } else {
            logInsertedData('ERC-20 deposit');
            res.status(200).send('ERC-20 Token deposit request received');
        }
    });
});

// Endpoint for NFT Deposit
app.post('/api/deposit/nft', (req, res) => {
    const { nftAddress, tokenId } = req.body;
    logRequestData('/api/deposit/nft', req.body);
    
    const query = `INSERT INTO requests (type, assetType, nftAddress, tokenId) VALUES (?, ?, ?, ?)`;
    db.run(query, ['deposit', 'nft', nftAddress, tokenId], (err) => {
        logOperationResult('NFT deposit', err);
        if (err) {
            res.status(500).send('Error processing NFT deposit request');
        } else {
            logInsertedData('NFT deposit');
            res.status(200).send('NFT deposit request received');
        }
    });
});

// Endpoint for ERC-20 Token Withdrawal
app.post('/api/withdraw/erc20', (req, res) => {
    const { tokenAddress, amount, walletAddress, TrnxHash } = req.body;
    logRequestData('/api/withdraw/erc20', req.body);
    
    const query = `INSERT INTO requests (type, assetType, tokenAddress, amount, walletAddress, TrnxHash) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, ['withdraw', 'erc20', tokenAddress, amount, walletAddress, TrnxHash], (err) => {
        logOperationResult('ERC-20 withdrawal', err);
        if (err) {
            res.status(500).send('Error processing request');
        } else {
            logInsertedData('ERC-20 withdrawal');
            res.status(200).send('ERC-20 Token withdrawal request received');
        }
    });
});

// Endpoint for NFT Withdrawal
app.post('/api/withdraw/nft', (req, res) => {
    const { nftAddress, tokenId, walletAddress, TrnxHash } = req.body;
    logRequestData('/api/withdraw/nft', req.body);
    
    const query = `INSERT INTO requests (type, assetType, nftAddress, tokenId, walletAddress, TrnxHash) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, ['withdraw', 'nft', nftAddress, tokenId, walletAddress, TrnxHash], (err) => {
        logOperationResult('NFT withdrawal', err);
        if (err) {
            res.status(500).send('Error processing request');
        } else {
            logInsertedData('NFT withdrawal');
            res.status(200).send('NFT withdrawal request received');
        }
    });
});

// Endpoint for ERC-20 Token Borrow
app.post('/api/borrow/erc20', (req, res) => {
    const { tokenAddress, amount, walletAddress } = req.body;
    logRequestData('/api/borrow/erc20', req.body);
    
    const query = `INSERT INTO requests (type, assetType, tokenAddress, amount, walletAddress) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, ['borrow', 'erc20', tokenAddress, amount, walletAddress], (err) => {
        logOperationResult('ERC-20 borrow', err);
        if (err) {
            res.status(500).send('Error processing request');
        } else {
            logInsertedData('ERC-20 borrow');
            res.status(200).send('ERC-20 Token borrow request received');
        }
    });
});

// Endpoint for NFT Borrow
app.post('/api/borrow/nft', (req, res) => {
    const { nftAddress, tokenId, walletAddress } = req.body;
    logRequestData('/api/borrow/nft', req.body);
    
    const query = `INSERT INTO requests (type, assetType, nftAddress, tokenId, walletAddress) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, ['borrow', 'nft', nftAddress, tokenId, walletAddress], (err) => {
        logOperationResult('NFT borrow', err);
        if (err) {
            res.status(500).send('Error processing request');
        } else {
            logInsertedData('NFT borrow');
            res.status(200).send('NFT borrow request received');
        }
    });
});

// Endpoints to get requests
app.get('/api/get-borrow-reqs', (req, res) => {
    console.log('Fetching all borrow requests...');
    const query = `SELECT * FROM requests WHERE type = 'borrow'`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching borrow requests:', err.message);
            res.status(500).send('Error fetching borrow requests');
        } else {
            console.log('Borrow requests fetched successfully.');
            res.status(200).json(rows);
        }
    });
});

app.get('/api/get-withdraw-reqs', (req, res) => {
    console.log('Fetching all withdraw requests...');
    const query = `SELECT * FROM requests WHERE type = 'withdraw'`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching withdraw requests:', err.message);
            res.status(500).send('Error fetching withdraw requests');
        } else {
            console.log('Withdraw requests fetched successfully.');
            res.status(200).json(rows);
        }
    });
});

app.post('/api/approve-request', (req, res) => {
    const { id, status, type } = req.body;

    if (status === 'Approved') {
        db.run(
            'UPDATE requests SET approved = ? WHERE id = ? AND type = ?',
            [true, id, type],
            function (err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Database error');
                } else {
                    // Fetch the updated request details
                    db.get(
                        'SELECT * FROM requests WHERE id = ? AND type = ?',
                        [id, type],
                        (err, row) => {
                            if (err) {
                                console.error('Error fetching updated request:', err.message);
                            } else {
                                console.log('Updated request details:', row);
                                res.send('Request updated');
                            }
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send('Invalid status');
    }
});

app.post('/api/unapprove-request', (req, res) => {
    const { id, status, type } = req.body;

    if (status === 'Unapproved') {
        db.run(
            'UPDATE requests SET approved = ? WHERE id = ? AND type = ?',
            [false, id, type],
            function (err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Database error');
                } else {
                    // Fetch the updated request details
                    db.get(
                        'SELECT * FROM requests WHERE id = ? AND type = ?',
                        [id, type],
                        (err, row) => {
                            if (err) {
                                console.error('Error fetching updated request:', err.message);
                            } else {
                                console.log('Updated request details:', row);
                                res.send('Request updated');
                            }
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send('Invalid status');
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
