const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
const db = require('../db')

// TESTIMONIALS

const testimonials = db.testimonials;

router.route('/testimonials').get((req, res) => {
  res.json(testimonials)
});

router.route('/testimonials/random').get((req, res) => {
  res.json(testimonials[Math.floor(Math.random() * db.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(testimonials[req.params.id-1])
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = uuid();
  const newTestimonials = { id, author, text };
  testimonials.push(newTestimonials);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id-1;
  const testimonial = testimonials[id];
  testimonial.author = author;
  testimonial.text = text;
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id-1;
  testimonials.splice(db[id], 1);
  res.json({ message: 'OK' });
});

module.exports = router;