require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const exchangeRateUSD = 0.01;
const sessions = {};

app.post('/checkout/initiate', (req, res) => {
  const { amountFiat, fiatCurrency, customerWallet, merchantWallet, metadata } = req.body;
  if (!amountFiat || !fiatCurrency || !customerWallet || !merchantWallet) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sessionId = uuidv4();
  const simAmount = (amountFiat / exchangeRateUSD).toFixed(2);

  sessions[sessionId] = {
    sessionId,
    simAmount,
    conversionRate: exchangeRateUSD,
    merchantWallet,
    customerWallet,
    metadata,
    createdAt: Date.now(),
    expiresIn: 300000
  };

  return res.json({ sessionId, simAmount, conversionRate: exchangeRateUSD, expiresIn: 300 });
});

app.post('/checkout/confirm', (req, res) => {
  const { sessionId, signature } = req.body;
  const session = sessions[sessionId];

  if (!session) return res.status(404).json({ error: 'Invalid session ID' });

  return res.json({ status: 'success', txHash: '0xFAKE_HASH' });
});

app.listen(PORT, () => {
  console.log(`Simoleon API running at http://localhost:${PORT}`);
});
