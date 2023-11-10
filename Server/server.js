const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(bodyParser.json());

app.use('/', noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
