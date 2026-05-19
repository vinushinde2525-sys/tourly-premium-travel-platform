const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// ── Load static data ──────────────────────────
let destinationsData = [];
let packagesData     = [];
let testimonialsData = [];

try {
  destinationsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'destinations.json'), 'utf-8'));
  packagesData     = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'packages.json'),     'utf-8'));
  testimonialsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'testimonials.json'), 'utf-8'));
  console.log('✅ Data loaded — destinations:', destinationsData.length, '| packages:', packagesData.length, '| testimonials:', testimonialsData.length);
} catch (err) {
  console.error('❌ Failed to load data files:', err.message);
}

// In-memory newsletter store
const subscribers = [];

// ── Global error handler helper ───────────────
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error('Route error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  });
};

// ── Destinations ──────────────────────────────
app.get('/api/destinations', asyncHandler((req, res) => {
  const { region, tag, featured, search } = req.query;
  let result = [...destinationsData];

  if (region && region !== 'All')  result = result.filter(d => d.region === region);
  if (tag && tag !== 'All')        result = result.filter(d => d.tags && d.tags.includes(tag));
  if (featured === 'true')         result = result.filter(d => d.featured === true);
  if (search)                      result = result.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.country.toLowerCase().includes(search.toLowerCase())
  );

  res.json({ success: true, count: result.length, data: result });
}));

app.get('/api/destinations/:id', asyncHandler((req, res) => {
  const dest = destinationsData.find(d => d.id === parseInt(req.params.id));
  if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });
  res.json({ success: true, data: dest });
}));

// ── Packages ──────────────────────────────────
app.get('/api/packages', asyncHandler((req, res) => {
  const { category, maxPrice } = req.query;
  let result = [...packagesData];

  if (category && category !== 'all') result = result.filter(p => p.category === category);
  if (maxPrice)                       result = result.filter(p => p.price <= parseInt(maxPrice));

  res.json({ success: true, count: result.length, data: result });
}));

app.get('/api/packages/:id', asyncHandler((req, res) => {
  const pkg = packagesData.find(p => p.id === parseInt(req.params.id));
  if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
  res.json({ success: true, data: pkg });
}));

// ── Testimonials ──────────────────────────────
app.get('/api/testimonials', asyncHandler((req, res) => {
  res.json({ success: true, data: testimonialsData });
}));

// ── Search ────────────────────────────────────
app.post('/api/search', asyncHandler((req, res) => {
  const { destination, checkin, checkout, people } = req.body;
  const results = destinationsData.filter(d =>
    d.name.toLowerCase().includes((destination || '').toLowerCase()) ||
    d.country.toLowerCase().includes((destination || '').toLowerCase())
  );
  res.json({ success: true, query: { destination, checkin, checkout, people }, results });
}));

// ── Newsletter ────────────────────────────────
app.post('/api/newsletter', asyncHandler((req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  if (subscribers.includes(email))
    return res.json({ success: false, message: 'Already subscribed!' });
  subscribers.push(email);
  res.json({ success: true, message: 'Successfully subscribed!' });
}));

// ── Contact ───────────────────────────────────
app.post('/api/contact', asyncHandler((req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: 'All fields required' });
  console.log('📩 Contact form:', { name, email, message });
  res.json({ success: true, message: 'Message received! We will get back to you soon.' });
}));

// ── Start ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Tourly API running at http://localhost:${PORT}`);
  console.log(`   Test it: http://localhost:${PORT}/api/destinations`);
});
