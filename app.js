const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes, fileRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
