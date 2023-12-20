const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes, fileRoutes);

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
