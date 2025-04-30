const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/book', async (req, res) => {
  try {
    const response = await axios.post('https://api.cal.com/v2/bookings', req.body, {
      headers: {
        'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
        'Content-Type': 'application/json',
        'cal-api-version': '2'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

module.exports = app;
