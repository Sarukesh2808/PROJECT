const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/job');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sarukesh2808:xiONMOpxfJ182w4j@cluster0.p8c3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
