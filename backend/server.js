const express = require('express');
const Console = require("console");
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//init Middleware

app.use(express.json({ extended: false}));

//General Route.
app.get('/', (req,res) => res.send('API Running'))

//Definimos Rutas.
app.use('/api/gender', require('./routes/api/GenderRoutes'));
app.use('/api/users', require('./routes/api/UserRoutes'));
app.use('/api/auth', require('./routes/api/AuthRoutes'))
app.use('/api/condition', require('./routes/api/ConditionRoutes'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


