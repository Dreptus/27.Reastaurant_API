const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const db = require('../db')

// CONCERTS

const concerts = db.concerts;

router.route('/concerts').get((req, res) => {
  res.json(concerts)
});

router.route('/concerts/:id').get((req, res) => {
  res.json(concerts[req.params.id-1])
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuid();
  const newConcert = { id, performer, genre, price, day, image };
  concerts.push(newConcert);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id-1;
  testimonials.splice(concerts[id], 1);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id-1;
  const concert = concerts[id];
  concert.performer = performer;
  concert.genre = genre;
  concert.price = price;
  concert.day = day;
  concert.image = image;
  res.json({ message: 'OK' });
});

module.exports = router;