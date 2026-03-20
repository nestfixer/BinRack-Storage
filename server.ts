import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

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
