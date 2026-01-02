const express = require('express');

const app = express();

const PORT = 3000;

// pacMUST be before routes

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');

app.use('/students', studentRoutes);

app.listen(PORT, () => {

console.log(`Server running on port ${PORT}`);

});
