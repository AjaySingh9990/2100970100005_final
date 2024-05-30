const express = require('express');
const app = express();
const PORT = 9876;

let window = [];

const data = {
  prime: [2, 3, 5, 7, 11],
  fibonacci: [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765],
  even: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
  random: [2, 19, 25, 7, 4, 24, 17, 27, 30, 21, 14, 10, 23],
};

app.get('/numbers/:type', (req, res) => {
  const type = req.params.type;

  if (!data[type]) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const newNumbers = data[type].slice(0, 10);
  const prevWindow = [...window];
  window = [...new Set([...window, ...newNumbers])];
  if (window.length > 10) {
    window = window.slice(window.length - 10);
  }

  const average = window.reduce((sum, num) => sum + num, 0) / window.length;

  res.json({
    windowPrevState: prevWindow,
    windowCurrState: window,
    numbers: newNumbers,
    avg: average.toFixed(2),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
