import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/quote', (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    postalCode,
    totesWide,
    totesTall,
    hasBins,
    additionalInfo,
    consentNonMarketing,
    consentMarketing,
  } = req.body;
  if (!firstName || !email) {
    res.status(400).json({ error: 'firstName and email are required' });
    return;
  }

  // Log the quote request — replace with email/CRM integration as needed
  console.log('Quote request received:', {
    firstName,
    lastName,
    phone,
    email,
    postalCode,
    totesWide,
    totesTall,
    hasBins,
    additionalInfo,
    consentNonMarketing,
    consentMarketing,
  });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`BinRack API server running on port ${PORT}`);
});
