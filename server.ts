import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (CSS, images, JS, etc.) from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

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

// Serve index.html for the root route
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`BinRack server running on port ${PORT}`);
});

// Graceful shutdown — wait for in-flight requests to finish before exiting
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
