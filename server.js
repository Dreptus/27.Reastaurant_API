const express = require('express');
const path = require('path');
const uuid = require('uuid').v4;
const cors = require('cors');
const db = require('./db');
const socket = require('socket.io');


//import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')))
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket! Its id – ' + socket.id);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json('404 not found...');
});

